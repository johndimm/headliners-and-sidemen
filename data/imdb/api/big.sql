with busy_artists as (
  select artist_id, count(*) as cnt
  from context
  group by 1
  having count(*) > 1
  order by cnt desc
  limit 1000
)  
  select c.title, c.release_group, sum(ba.cnt) as cnt
  from context as c
  join busy_artists as ba on ba.artist_id = c.artist_id
  where c.cover_url is null
  group by 1, 2
  order by cnt desc
  limit 100
;
