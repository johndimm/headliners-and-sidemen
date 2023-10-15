\set max_date '1942'

drop table if exists director_movie_year;
create table director_movie_year as
select
    dir.primaryName,
    tb.startYear,
    tb.primaryTitle,
    dir.sum_value,
    dir.min_start_year,
    rc.cover_url,
    tp.tconst,
    tr.averageRating,

    dir.nconst,
    tb.genres,
    tr.numVotes
from
    person_agg_year as dir
    -- join director_movie as dm using (nconst)
    -- join public.title_principals as tp using (tconst)
    join public.title_principals as tp using (nconst)
    join public.title_ratings as tr using (tconst)
    join public.title_basics as tb using (tconst)
    left join release_cover as rc on rc.release_group = tp.tconst
where
    tb.startYear < :max_date
order by 
    dir.sum_value desc,
    dir.min_start_year,
    dir.nconst,
    tb.startYear
;

\copy director_movie_year to director_movie_year.tsv delimiter E'\t' csv;

--limit
--    2000;

/*    
 select
 dir.nconst,
 dir.min_start_year,
 tb.startYear,
 substr(c.primaryTitle, 0, 20),
 dir.primaryName,
 tb.genres,
 tr.averageRating,
 tr.numVotes
 from
 directors as dir
 join director_movie as dm on dm.nconst = dir.nconst --  using (nconst)
 join public.title_principals as tp using (nconst)
 join public.title_ratings as tr using (tconst)
 join public.title_basics as tb using (tconst)
 where
 tr.numVotes > 100000
 order by
 dir.min_start_year,
 c.director_name,
 c.start_year,
 dir.sum_value desc
 limit
 2000;
 */
/*
 select language, count(*)
 from public.title_akas as akas
 where akas.isoriginaltitle
 and akas.language is not null
 group by 1
 ;
 */