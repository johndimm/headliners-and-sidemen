select distinct
    dir.primaryName,
    tb.startYear,
    tb.primaryTitle,
    dir.sum_value,
    dir.min_start_year,
    
    dir.nconst,
    tb.genres,
    tr.averageRating,
    tr.numVotes
from
    directors as dir
    join director_movie as dm using (nconst)
    join public.title_principals using (tconst)
    join public.title_ratings as tr using (tconst)
    join public.title_basics as tb using (tconst)
where
    tb.startYear is not null
and dir.primaryName = 'Ken Russell'
order by 
    dir.min_start_year,
    dir.nconst,
    tb.startYear
;
