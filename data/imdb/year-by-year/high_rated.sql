--
-- Select people by their movie ratings.
-- 

-- \set max_date 2023

-- Exctract the high-vote actors, actresses, directors, etc.

drop table if exists high_rated;

create table high_rated as
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
    tb.titleType like 'tv%'
    and tr.numVotes >=  greatest(tb.startYear - 1940, 0) * 80 + 100
    -- and tb.startYear <= :max_date
order by
    tb.startYear,
    tb.genres;

select
    count(*)
from
    high_rated;

-- select * from director_movie limit 10;
create index idx_hr_start on high_rated(startYear);

create index idx_hr_dir on high_rated(nconst);

/*

select startYear, count(distinct nconst) num_distinct_directors, count(*) num_movies
from director_movie
group by 1
order by 1
;
*/

