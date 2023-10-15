-- create index idx_tpcat on public.title_principals(category);

drop table if exists actor_movie;
create table actor_movie as
select tp.tconst as movie_id,  
tb.primaryTitle as movie_title, 
tp.nconst as actor_id, 
nb.primaryName as actor_name,
tb.genres,
tb.startYear as start_year,
tb.runtimeMinutes,
tr.averageRating,
tr.numVotes
from public.title_principals as tp
join public.title_basics as tb using (tconst)
join public.name_basics as nb using (nconst)
join public.title_ratings as tr using (tconst)
where tp.category = 'actress'
and tb.titleType = 'movie'
order by tb.startYear, tb.genres
;

select count(*) from actor_movie;

select * from actor_movie limit 10;

create index idx_dir_start on actor_movie(start_year);
create index idx_dir_dir on actor_movie(actor_id);

select min(start_year), max(start_year)
from actor_movie;

drop table if exists actors;
create table actors as
select actor_id, actor_name, 
  min(numVotes) as min_num_votes, 
  max(numVotes) as max_num_votes,
  min(averageRating) as min_average_rating,
  max(averageRating) as max_average_rating,
  min(start_year) as min_start_year,
  max(start_year) as max_start_year,
  sum(runtimeMinutes) as sum_runtime_minutes,
  cast(sum(averageRating * numVotes) as int) as sum_value,
  count(*) as cnt 
from actor_movie
group by 1,2
order by min(start_year), max(averageRating)
;

-- * (runtimeMinutes / 60.0)) as int
