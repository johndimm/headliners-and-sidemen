select *
from top_movie_year
where startyear between 1970 and 1975
and rank between 1 and 10 
order by startyear, rank
;
