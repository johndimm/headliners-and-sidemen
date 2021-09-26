-- set search_path=context;

drop type if exists context_record_type cascade;
create type context_record_type as (
    release_group int,
    title character varying,
    headliner character varying,
    headliner_id integer,
    artist character varying,
    artist_id integer,
    instrument character varying(255),
    begin_date date,
    end_date date,
    cover_url text,
    rank int
);

drop type if exists page_section_enum cascade;
create type page_section_enum as
  enum('last_before', 'center', 'first_after');



drop function if exists search;
create or replace function search(_query text)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    select c.*, 1 as rank
    from context as c
    where c.artist ilike concat('%', _query, '%')
      or c.title ilike concat('%', _query, '%')
    order by c.begin_date desc
    limit 100
    ;
end;
$$
;

drop function if exists release_group;
drop function if exists get_release_group;
create or replace function release_group(release_group_id int)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    select c.*, 1 as rank
    from context as c
    where c.release_group=release_group_id
    order by c.artist
    limit 200
    ;
end;
$$
;

DROP FUNCTION if exists artist_releases;
create or replace function artist_releases(_artist_id int)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    select c.*, 1 as rank
    from context as c
    where c.artist_id = _artist_id
    order by c.begin_date desc
    limit 300
    ;
end;
$$
;

drop function if exists first_after(int);
create or replace function first_after(_release_group_id int)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    with all_after as (
      select c2.*,
        cast(ROW_NUMBER() OVER (PARTITION by c2.artist
            ORDER BY c2.begin_date
            ) as int) as rank
      from context as c 
      join context as c2 on c2.artist_id = c.artist_id
      where c.release_group = _release_group_id 
      and c2.begin_date > c.begin_date
      order by c2.artist, c2.begin_date
    )
    select *
    from all_after as ab
    where ab.rank = 1
    order by ab.artist
    ;
end;
$$
;

drop function if exists last_before(int);
create or replace function last_before(_release_group_id int)
returns setof context_record_type
language plpgsql    
as $$
begin
  return query
    with all_before as (
      select c2.*,
          cast(ROW_NUMBER() OVER (PARTITION by c2.artist
            ORDER BY c2.begin_date DESC
            ) as int) as rank
      from context as c 
      join context as c2 on c2.artist_id = c.artist_id
      where c.release_group = _release_group_id 
      and c2.begin_date < c.begin_date
      order by c2.artist, c2.begin_date desc
    )
    select *
    from all_before as ab
    where ab.rank = 1
    order by ab.artist
    ;
end;
$$
;

create or replace function release_group_set(_release_group int)
returns table (
    release_group int,
    title character varying,
    headliner character varying,
    headliner_id integer,
    artist character varying,
    artist_id integer,
    instrument character varying(255),
    begin_date date,
    end_date date,
    cover_url text,
    rank int,
    page_section page_section_enum 
)
language plpgsql    
as $$
begin
  return query

/*
    c.release_group,
    c.title,
    c.headliner,
    c.headliner_id,
    c.artist,
    c.artist_id,
    c.instrument,
    c.begin_date,
    c.end_date,
    c.rank,
    c.release_group_gid,
*/

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