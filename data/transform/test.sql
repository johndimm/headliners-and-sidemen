select 
  release_group, artist_id, count(*) as cnt
from 
  context
group by 1, 2
having count(*) > 1
;
