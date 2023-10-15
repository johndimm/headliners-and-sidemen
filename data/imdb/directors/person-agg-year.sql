\set min_movies 3

drop table if exists person_agg_year;
create table person_agg_year as
select 
    nconst, 
    primaryName, 
    min(min_num_votes) as min_num_votes, 
    max(max_num_votes) as max_num_votes,
    min(min_average_rating) as min_average_rating,
    max(max_average_rating) as max_average_rating,
    min(min_start_year) as min_start_year,
    max(max_start_year) as max_start_year,
    sum(sum_runtime_minutes) as sum_runtime_minutes,
    sum(sum_value) as sum_value,
    sum(cnt) as cnt
from 
    directors
group by 1,2
having sum(cnt) >= :min_movies
order by sum(sum_value) desc
;

create index idx_pay_n on person_agg_year(nconst);

analyze person_agg_year;