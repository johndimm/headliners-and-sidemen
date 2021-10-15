select 
*
/*
rg.id as release_group,
rg.gid as release_group_gid,
  rg.name as title,
  rga.name as headliner,   
  rga.id as headliner_id,
  a.name as artist,
  a.id as artist_id,
  lat.name as instrument,
  make_date(l.begin_date_year,
  coalesce(l.begin_date_month,1),
  coalesce(l.begin_date_day,1) ) as begin_date,
  make_date(l.end_date_year,
  coalesce(l.end_date_month,1),
  coalesce(l.end_date_day,1) ) as end_date,
  min(rc.date_year) as release_year
*/
from release_group as rg
join release as r on r.release_group = rg.id
join release_country as rc on rc.id_release = r.id
join artist as rga on rga.id = rg.artist_credit
join medium as m on m.release = r.id
join track as t on t.medium = m.id
join l_artist_recording as ar on ar.entity1 = t.recording
join artist a on a.id = ar.entity0
join link as l on l.id = ar.link
join link_attribute as la on la.link = l.id
join link_attribute_type as lat on lat.id = la.attribute_type
where rg.id = 756698 
-- where a.name ='Harold Melvin'
-- and l.begin_date_year is not null
-- group by 1,2,3,4,5,6,7,8,9,10
;
