drop table if exists tmp;
create temporary table tmp as
select *
from top_movie_year
where startYear is not null
;

\copy tmp to top_movie_year.tsv CSV delimiter E'\t';

