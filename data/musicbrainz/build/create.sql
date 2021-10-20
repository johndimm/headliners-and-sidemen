drop table if exists context;

create table context as
select 
  cast(rg.gid as text) as release_group,
  rg.name as title,
  rga.name as headliner,   
  cast(rga.gid as text) as headliner_id,
  a.name as artist,
  cast(a.gid as text) as artist_id,
  lat.name as instrument,
  make_date(a.begin_date_year,
  coalesce(a.begin_date_month,1),
  coalesce(a.begin_date_day,1) ) as begin_date_artist,

  make_date(l.begin_date_year,
  coalesce(l.begin_date_month,1),
  coalesce(l.begin_date_day,1) ) as begin_date,
  make_date(l.end_date_year,
  coalesce(l.end_date_month,1),
  coalesce(l.end_date_day,1) ) as end_date,


  min(rc.date_year) as release_year
from public.release_group as rg
join public.release as r on r.release_group = rg.id
left join public.release_country as rc on rc.id_release = r.id
join public.artist as rga on rga.id = rg.artist_credit
join public.medium as m on m.release = r.id
join public.track as t on t.medium = m.id
join public.l_artist_recording as ar on ar.entity1 = t.recording
join public.artist a on a.id = ar.entity0
join public.link as l on l.id = ar.link
join public.link_attribute as la on la.link = l.id
join public.link_attribute_type as lat on lat.id = la.attribute_type
-- where rg.id = 66623
-- where a.name ='Harold Melvin'
-- and l.begin_date_year is not null
group by 1,2,3,4,5,6,7,8,9,10
;
