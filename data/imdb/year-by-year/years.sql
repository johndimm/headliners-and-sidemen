drop table if exists tmp;
create table tmp as
select startYear
from top_movie_year
group by 1
order by 1 desc
;

\copy tmp to 'tmp';
