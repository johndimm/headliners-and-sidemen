select 
  rga.name as headliner,   
  cast(rga.gid as text) as headliner_id,
--  cast(rg.gid as text) as release_group,
  rg.name as title,
  a.name as artist,
  make_date(a.begin_date_year,
  coalesce(a.begin_date_month,1),
  coalesce(a.begin_date_day,1) ) as begin_date_artist,

  make_date(l.begin_date_year,
  coalesce(l.begin_date_month,1),
  coalesce(l.begin_date_day,1) ) as begin_date,
  make_date(l.end_date_year,
  coalesce(l.end_date_month,1),
  coalesce(l.end_date_day,1) ) as end_date,


  rc.date_year as release_year
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
where 
-- a.name ='Mick Ronson'
-- and 
rg.gid = '6c131f32-7f6b-398b-b7f0-56f4cbbada16'
-- and l.begin_date_year is not null
order by begin_date, release_year
;

select *
from public.release_group
where gid = '6c131f32-7f6b-398b-b7f0-56f4cbbada16'
;
