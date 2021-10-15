drop table if exists context_unique;
create table context_unique as
select 
release_group,
min(cover_url) as cover_url
from old.context
where cover_url is not null
group by 1
;


drop table if exists context_cover;
create table context_cover as
select 
c1.release_group,
c1.release_group_gid,
c1.title,
c1.headliner,
c1.headliner_id,
c1.artist,
c1.artist_id,
instrument,
begin_date,
c2.cover_url
from c_agg c1
left join context_unique as c2 on 
     c2.release_group = c1.release_group 
limit 8000000
;

-- How many release_groups are in context_unique and not in context?
drop table if exists context_missing;
create table context_missing as
select cu.* -- count(distinct cu.release_group)
from context_unique as cu
left join c_agg as c on c.release_group = cu.release_group
where c.release_group is null;

