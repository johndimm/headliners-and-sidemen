-- \set min_votes 100
\set max_date 2023
-- Needs to adapt to the date.  For 1930, 1000 or less is good.  For 2000, better keep above 10000.


-- Exctract the high-vote actors, actresses, directors, etc.

drop table if exists director_movie;

create table director_movie as
select
    tp.tconst,
    tb.primaryTitle,
    tp.nconst,
    nb.primaryName,
    tb.genres,
    tb.startYear,
    tb.runtimeMinutes,
    tr.averageRating,
    tr.numVotes,
    tp.category
from
    public.title_principals as tp
    join public.title_basics as tb using (tconst)
    join public.name_basics as nb using (nconst)
    join public.title_ratings as tr using (tconst)
where
    tb.titleType = 'movie'
    and tr.numVotes >=  greatest(tb.startYear - 1940, 0) * 80 + 100
    and tb.startYear <= :max_date
order by
    tb.startYear,
    tb.genres;

select
    count(*)
from
    director_movie;

-- select * from director_movie limit 10;
create index idx_dir_start on director_movie(startYear);

create index idx_dir_dir on director_movie(nconst);

/*

select startYear, count(distinct nconst) num_distinct_directors, count(*) num_movies
from director_movie
group by 1
order by 1
;
*/

