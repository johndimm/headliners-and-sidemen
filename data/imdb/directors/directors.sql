-- create index idx_tpcat on public.title_principals(category);

-- \set min_movies 3
-- \set max_date '2000'

drop table if exists directors;
create table directors as
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
from director_movie
group by 1,2,3,4
-- having count(*) > :min_movies
order by max(averageRating) desc
;

create index idx_d_y on directors(startYear);
create index idx_d_n on directors(nconst);

analyze directors;

