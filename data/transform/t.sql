select 
c1.release_group, c2.release_group, c2.cover_url
from context c1
left join release_cover as c2 on 
     c2.release_group = c1.release_group
--where c1.release_group = 'tt0110912'
where c2.cover_url is not null
limit 10
;
