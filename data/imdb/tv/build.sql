set search_path=staging_tv;

drop table if exists staging_tv.context;
create table staging_tv.context as
select 
    cast (replace(tb.tconst, 'tt', '') as int) as release_group,
    cast (null as uuid) as release_group_gid,
    cast (tb.primaryTitle as character varying) as title, 
    cast('' as character varying) as headliner,
    -1 as headliner_id,
    cast (nb.primaryName as character varying) as artist,
    cast (replace(nb.nconst, 'nm', '') as int) as artist_id,
    cast(tp.characters as varchar(255)) as instrument,
    make_date(tb.startYear,1,1) as begin_date,
    null as cover_url,
    to_tsvector('english', tb.primaryTitle || ' ' || nb.primaryName) as fulltext,
    cast(ROW_NUMBER() OVER (PARTITION by tp.nconst
    ORDER BY tb.startYear
    ) as int) as artist_seq

from public.title_basics as tb
join public.title_principals as tp on tp.tconst = tb.tconst
join public.name_basics as nb on nb.nconst = tp.nconst
-- where tb.primaryTitle = 'Deal with being alive'
where tb.titleType = 'tvSeries'
limit 50000000
;


