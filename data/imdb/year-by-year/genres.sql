with exploded as (
select unnest(string_to_array(genres, ','))
from top_movie_year
) select unnest, count(*) from exploded group by 1; 
