with movies as (
  select
    tmy.startYear,
    tmy.cover_url,
    tmy.primaryTitle,
    tmy.genres,
    tmy.tconst,
    tmy.rank,
    cast(
      rank() OVER (
        PARTITION BY tmy.startYear
        ORDER BY
          tmy.rank
      ) as int
    ) as local_rank 
  from
    top_movie_year as tmy
  where
    ( false is null or false = false
      or 
      tmy.rank < 6000 - (5000 / 113) * (tmy.startYear - 1910)
    )
    and
    ( false is null or false = false
      or
      abs(tmy.startYear - 2018) < (3 / 2)
    )
    and 
    (
      null is null
      or tmy.titleType = null
    )
    and (
      null is null
      or null = ''
      or string_to_array(tmy.genres, ',') && string_to_array(null, ',') -- or position(_genre in tmy.genres) > 0 
    )
    and (
      null is null or null = ''
      or position (null in tmy.primaryTitle) > 0
    ) 
  ), start_years as (
  select movies.startYear, count(*)
  from movies
  group by 1
  order by abs(movies.startYear - 2018)
  limit 3
  )


select
  movies.*
from
  start_years as sy
join  
  movies on movies.startYear = sy.startYear
where
  movies.local_rank between 1
  and 3
order by
  rank
limit
  1000;
