set search_path=context;

create or replace function search(_query text)
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
    release_group_gid uuid 
)
language plpgsql    
as $$
begin
  return query
    select c.*, rg.gid as release_group_gid
    from context.context as c
    join context.release_group as rg on rg.id = c.release_group
    where c.artist ilike concat('%', _query, '%')
      or c.title ilike concat('%', _query, '%')
      or c.instrument ilike concat('%', _query, '%')
    order by c.begin_date desc
    limit 100
    ;
end;
$$
;

create or replace function release_artists(release_group_id int)
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
    release_group_gid uuid 
)
language plpgsql    
as $$
begin
  return query
    select c.*, rg.gid as release_group_gid
    from context.context as c
    join context.release_group as rg on rg.id = c.release_group
    where c.release_group=release_group_id
    order by c.artist
    limit 200
    ;
end;
$$
;

create or replace function artist_releases(_artist_id int)
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
    release_group_gid uuid 
)
language plpgsql    
as $$
begin
  return query
    select c.*, rg.gid as release_group_gid
    from context.context as c
    join context.release_group as rg on rg.id = c.release_group
    where c.artist_id = _artist_id
    order by c.begin_date desc
    limit 300
    ;
end;
$$
;

drop function first_after(int);
create or replace function first_after(_release_group_id int)
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
    rank bigint,
    release_group_gid uuid 
)
language plpgsql    
as $$
begin
  return query
    with all_after as (
      select c2.*,
          ROW_NUMBER() OVER (PARTITION by c2.artist
          ORDER BY c2.begin_date
          ) as rank, 
          rg.gid as release_group_gid
      from context.context as c 
      join context.context as c2 on c2.artist_id = c.artist_id
      join context.release_group as rg on rg.id = c2.release_group
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

drop function last_before(int);
create or replace function last_before(_release_group_id int)
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
    rank bigint,
    release_group_gid uuid    
)
language plpgsql    
as $$
begin
  return query
    with all_before as (
      select c2.*,
          ROW_NUMBER() OVER (PARTITION by c2.artist
            ORDER BY c2.begin_date DESC
            ) as rank,
          rg.gid as release_group_gid
      from context.context as c 
      join context.context as c2 on c2.artist_id = c.artist_id
      join context.release_group as rg on rg.id = c2.release_group
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

create or replace function first_after(_artist_id int, _target_date date)
returns table (
    release_group int,
    title character varying,
    headliner character varying,
    headliner_id integer,
    artist character varying,
    artist_id integer,
    instrument character varying(255),
    begin_date date,
    end_date date    
)
language plpgsql    
as $$
begin
  return query
    select *
    from context.context
    where context.artist_id = _artist_id
    and context.begin_date > _target_date
    order by context.begin_date
    limit 1
    ;
end;
$$
;


create or replace function last_before(_artist_id int, _target_date date)
returns table (
    release_group int,
    title character varying,
    headliner character varying,
    headliner_id integer,
    artist character varying,
    artist_id integer,
    instrument character varying(255),
    begin_date date,
    end_date date    
)
language plpgsql    
as $$
begin
  return query
    select *
    from context.context
    where context.artist_id = _artist_id
    and context.begin_date < _target_date
    order by context.begin_date desc
    limit 1
    ;
end;
$$
;