
drop table if exists context_cover;
create table context_cover as
select 
c1.release_group,
c1.title,
c1.headliner,
c1.headliner_id,
c1.artist,
c1.artist_id,
c1.instrument,
c1.begin_date,
coalesce(c1.cover_url,c2.cover_url) as cover_url
from context c1
left join context_unique as c2 on 
     c2.release_group = c1.release_group 
  and c2.artist_id = c1.artist_id 
  and c2.begin_date = c1.begin_date
limit 4000000
;

