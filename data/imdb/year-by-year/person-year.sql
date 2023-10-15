--
-- Get aggregations over year by person.

-- prep:
-- create index idx_tpcat on public.title_principals(category);

-- \set min_movies 3
-- \set max_date '2000'

drop table if exists person_year;
create table person_year as
select 
  startYear, 
  nconst, 
  primaryName, 
  category,
  min(numVotes) as min_num_votes, 
  max(numVotes) as max_num_votes,
  min(averageRating) as min_average_rating,
  max(averageRating) as max_average_rating,
  min(startYear) as min_start_year,
  max(startYear) as max_start_year,
  sum(runtimeMinutes) as sum_runtime_minutes,
  cast(sum(averageRating * numVotes) as int) as sum_value,
  count(*) as cnt 
from high_rated
group by 1,2,3,4
order by max(averageRating) desc
;

create index idx_py_y on person_year(startYear);
create index idx_py_n on person_year(nconst);

analyze person_year;

