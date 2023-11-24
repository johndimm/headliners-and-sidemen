drop table if exists top_movie_year;
drop view if exists top_movie_year;
create view top_movie_year as
select 
    startYear,
    rc.cover_url,
    primaryTitle,
    genres,
    tmy.tconst,
    titleType,
    rank,
    fulltext
from tmy
left join release_cover as rc on rc.release_group = tmy.tconst
;
