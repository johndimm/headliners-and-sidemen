-- set search_path=tv;

drop type if exists context_record_type cascade;
create type context_record_type as (
    release_group text,
    title character varying,
    headliner character varying,
    headliner_id text,
    artist character varying,
    artist_id text,
    instrument text,
    begin_date date,
    age int,
    cover_url text,
    fulltext tsvector,
    artist_seq int,
    rank int
);

drop type if exists page_section_enum cascade;
create type page_section_enum as
  enum('last_before', 'center', 'first_after');

drop function if exists update_imdb_cover_art;
create or replace function update_imdb_cover_art(_release_group text, _url text)
returns boolean
language plpgsql    
as $$
begin
    update context 
    set cover_url = _url 
    where release_group = _release_group;

    return 1;
end;
$$
;


drop function if exists search;
create or replace function search(_query text)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    with exact_match as (
      select * from context as c
        where c.artist = _query
        or c.title = _query
    ),
    fuzzy_match as (
      select * from context as c
        where 0 = (select count(*) from exact_match) 
        and c.fulltext @@ to_tsquery('english', replace(_query,' ',' & '))
   ),
    hits as (
      select * from exact_match union all select * from fuzzy_match
    ),
    years as (
    select c.*, 
          cast(ROW_NUMBER() OVER (PARTITION by extract(year from c.begin_date)
            ORDER BY c.begin_date
          ) as int) as rank
    from hits as c
    order by c.begin_date 
    )
    select *
    from years
    where rank <= 5
    -- limit 200
    ;
end;
$$
;


drop function if exists search_early_late;
create or replace function search_early_late(_query text)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    with latest as (
    select c.*, 1 as rank
    from context as c
    where c.fulltext @@ to_tsquery('english', replace(_query,' ',' & '))
    order by c.begin_date desc
    limit 200
    ), earliest as (
    select c.*, 1 as rank
    from context as c
    where c.fulltext @@ to_tsquery('english', replace(_query,' ',' & '))
    order by c.begin_date 
    limit 200
    )
    select * from earliest
    union
    select * from latest
    ;
end;
$$
;

drop function if exists release_group;
drop function if exists get_release_group;
create or replace function release_group(_release_group text)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    select c.*, 1 as rank
    from context as c
    where c.release_group=_release_group
    order by c.artist
    limit 200
    ;
end;
$$
;

DROP FUNCTION if exists artist_releases;
create or replace function artist_releases(_artist_id text)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    select c.*, 1 as rank
    from context as c
    where c.artist_id = _artist_id
    order by c.begin_date
    limit 800
    ;
end;
$$
;

drop function if exists first_after;
create or replace function first_after(_release_group text)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    with all_after as (
      select c2.*, 
          cast(ROW_NUMBER() OVER (PARTITION by c2.artist
            ORDER BY c2.artist_seq
            ) as int) as rank
      from context as c 
      join context as c2 on c2.artist_id = c.artist_id 

      where c.release_group = _release_group 
      and c2.artist_seq > c.artist_seq
      and c.release_group != c2.release_group
      order by c2.artist, c2.artist_seq
    )
    select *
    from all_after as ab
    where rank = 1
    order by ab.artist
    ;
end;
$$
;


drop function if exists last_before;
create or replace function last_before(_release_group text)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    with all_after as (
      select c2.*,  cast(ROW_NUMBER() OVER (PARTITION by c2.artist
            ORDER BY c2.artist_seq desc
            ) as int) as rank
      from context as c 
      join context as c2 on c2.artist_id = c.artist_id 

      where c.release_group = _release_group
      and c2.release_group != c.release_group
      and c2.artist_seq < c.artist_seq
      order by c2.artist, c2.artist_seq desc
    )
    select *
    from all_after as ab
    where rank = 1
    order by ab.artist
    ;
end;
$$
;

create or replace function release_group_set(_release_group text)
returns table (
    release_group text,
    title character varying,
    headliner character varying,
    headliner_id text,
    artist character varying,
    artist_id text,
    instrument text,
    begin_date date,
    age int,
    cover_url text,
    fulltext tsvector,
    artist_seq int,
    rank int,
    page_section page_section_enum 
)
language plpgsql    
as $$
begin
  return query

    select *,    
    cast('last_before' as page_section_enum) as page_section
    from last_before(_release_group) as c

    union all

    select *,
      cast('center' as page_section_enum) as page_section
    from release_group(_release_group)

    union all

    select *, 
      cast('first_after' as page_section_enum) as page_section
    from first_after(_release_group)

    ;
end;
$$
;
