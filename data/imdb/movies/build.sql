drop view if exists context;
drop table if exists context_base;
create table context_base as
select 
    cast (tb.tconst as text) as release_group,
    cast (tb.primaryTitle as character varying) as title, 
    cast('' as character varying) as headliner,
    cast ('' as text) as headliner_id,
    cast (nb.primaryName as character varying) as artist,
    cast (nb.nconst as text) as artist_id,
    cast(tp.characters as text) as instrument,
    make_date(tb.startYear,1,1) as begin_date,
    cast(tb.startYear as int) - cast(nb.birthYear as int) as age,
    to_tsvector('english', tb.primaryTitle || ' ' || nb.primaryName) as fulltext,
    cast(ROW_NUMBER() OVER (PARTITION by tp.nconst
    ORDER BY tb.startYear
    ) as int) as artist_seq

from public.title_basics as tb
join public.title_principals as tp on tp.tconst = tb.tconst
join public.name_basics as nb on nb.nconst = tp.nconst
-- where tb.titleType = 'movie'
where tb.titleType = 'tvSeries'
-- like 'tv%' and tb.titleType != 'tvEpisode'
;

create view context as
select
    cb.release_group,
    title,        
    headliner,    
    headliner_id, 
    artist,       
    artist_id,    
    instrument,   
    begin_date,   
    age,   
    rc.cover_url,       
    fulltext,     
    artist_seq
from context_base as cb
left join release_cover as rc on rc.release_group = cb.release_group
;


