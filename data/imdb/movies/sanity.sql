select count(*)
from context c
join movie_poster mp on mp.release_group = concat('tt', LPAD(cast(c.release_group as text), 7, '0'))
