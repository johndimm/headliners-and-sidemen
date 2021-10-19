drop table if exists context;
create table context as
select 
    cast (tb.tconst as text) as release_group,
    cast (tb.primaryTitle as character varying) as title, 
    cast('' as character varying) as headliner,
    cast ('' as text) as headliner_id,
    cast (nb.primaryName as character varying) as artist,
    cast (nb.nconst as text) as artist_id,
    cast(tp.characters as text) as instrument,
    make_date(tb.startYear,1,1) as begin_date,
    rc.cover_url as cover_url,
    to_tsvector('english', tb.primaryTitle || ' ' || nb.primaryName) as fulltext,
    cast(ROW_NUMBER() OVER (PARTITION by tp.nconst
    ORDER BY tb.startYear
    ) as int) as artist_seq

from public.title_basics as tb
join public.title_principals as tp on tp.tconst = tb.tconst
join public.name_basics as nb on nb.nconst = tp.nconst
left join release_cover as rc on rc.release_group = tb.tconst
where tb.titleType = 'movie'
;


