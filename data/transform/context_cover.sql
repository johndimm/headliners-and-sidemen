drop table if exists context_cover;
create table context_cover as
select 
c1.release_group,
cast(c1.title as citext) as title,
cast(c1.headliner as character varying) as headliner,
c1.headliner_id,
cast(c1.artist as citext) as artist,
c1.artist_id,
instrument,
begin_date,
age,
c2.cover_url
from context c1
left join release_cover as c2 on 
     c2.release_group = c1.release_group
limit 8000000
;

-- How many release_groups are in context_unique and not in context?
/*
drop table if exists context_missing;
create table context_missing as
select cu.* -- count(distinct cu.release_group)
from release_cover as cu
left join context as c on c.release_group = cu.release_group
where c.release_group is null;
*/
