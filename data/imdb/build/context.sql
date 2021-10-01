drop table if exists context;
create table context as
select tb.tconst as release_group,
tb.primaryTitle, nb.primaryName
from title_basics as tb
join title_principals as tp on tp.tconst = tb.tconst
join name_basics as nb on nb.nconst = tp.nconst
where tb.primaryTitle = 'True Romance'
and tb.titleType = 'movie'
;