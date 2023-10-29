drop function if exists array_intersect_count;
CREATE FUNCTION array_intersect_count(anyarray, anyarray)
  RETURNS int
  language sql
as $FUNCTION$
    SELECT count(*) from (
        SELECT UNNEST($1)
        INTERSECT
        SELECT UNNEST($2)
    ) as t;
$FUNCTION$;

drop function if exists get_movies;
create
or replace function get_movies(
  _year int,
  _genres text,
  _title_type text,
  _has_cover boolean,
  _max_local_rank int,
  _num_years int,
  _query text,
  _skim boolean
) returns table (
  startyear int,
  cover_url text,
  primaryTitle text,
  genres text,
  tconst text,
  rank int,
  local_rank int --, 
  --combo text,
  --included boolean,
  --overlap_count int
) language plpgsql as $$ begin return query 

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
    ( _skim is null or _skim = false
      or 
      tmy.rank < 6000 - (5000 / 113) * (tmy.startYear - 1910)
    )
    and
    ( _skim is null or _skim = false
      or
      abs(tmy.startYear - _year) < _num_years / 2
    )
    and 
    (
      _title_type is null
      or tmy.titleType = _title_type
    )
    and (
      _has_cover is null
      or tmy.cover_url is not null
    )
    and (
      _genres is null
      or _genres = ''
      or string_to_array(tmy.genres, ',') && string_to_array(_genres, ',') -- or position(_genre in tmy.genres) > 0 
    )
    and (
      _query is null or _query = ''
      or position (_query in tmy.primaryTitle) > 0
    )
  order by
    array_intersect_count(
      string_to_array(tmy.genres, ','),
      string_to_array(_genres, ',')
    ) desc,
    abs(length(tmy.genres) - length(_genres)) asc,
    rank
), start_years as (
  select movies.startYear, count(*)
  from movies
  group by 1
  order by abs(movies.startYear - _year)
  limit _num_years
)
select
  movies.*
from
  start_years as sy
join  
  movies on movies.startYear = sy.startYear
where
  movies.local_rank between 1
  and _max_local_rank
order by
  rank
limit
  1000;

end $$;

-- limit cast (60000 / (_year - 1894) as int)
--select *
--from get_movies(1968, 1969, 1, 2000, 'Romance,Thriller', 'movie', true)
--;
\x
select
  *
from
  get_movies(2018, '', null, null, 2, 5, 'Killers', true)
limit
  10;

/*
    and 
    (
      _year is null
      or tmy.startYear between _year - floor((_num_years) / 2)
      and _year + _num_years - 1 - floor((_num_years) / 2)
    )
*/