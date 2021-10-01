drop table if exists context;

create table context as
select 
cast (replace(tb.tconst, 'tt', '') as int) as release_group,
cast (tb.primaryTitle as character varying) as title, 
cast('' as character varying) as headliner,
-1 as headliner_id,
cast (nb.primaryName as character varying) as artist,
cast (replace(nb.nconst, 'nm', '') as int) as artist_id,
cast(tp.characters as varchar(255)) as instrument,
make_date(tb.startYear,1,1) as begin_date,
make_date(1900,1,1) as end_date,
null as cover_url
from title_basics as tb
join title_principals as tp on tp.tconst = tb.tconst
join name_basics as nb on nb.nconst = tp.nconst
-- where tb.primaryTitle = 'True Romance'
where tb.titleType = 'movie'
limit 50000000
;


create index idx_con_title on context(title);
create index idx_con_artist on context(artist);

create index idx_con_rg on context(release_group);
create index idx_con_aid on context(artist_id);

