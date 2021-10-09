drop table if exists context_cover;
create table context_cover as
select c1.*, c2.cover_url as cover_url
from context c1
left join context_old as c2 on 
     c2.release_group = c1.release_group 
  and c2.artist_id = c1.artist_id 
  and c1.instrument = c2.instrument
limit 3000000
;

