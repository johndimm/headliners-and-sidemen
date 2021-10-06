  select artist, artist_id, count(*) as cnt
  from context
  group by 1,2
  having count(*) > 200 
  -- order by cnt desc
  limit 100
;
