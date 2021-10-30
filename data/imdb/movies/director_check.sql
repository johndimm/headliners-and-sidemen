select distinct c.artist
-- count(*)
from staging.context as c
join director_context as d on c.release_group = d.release_group and c.artist_id = d.artist_id
-- where d.release_group is null
;
