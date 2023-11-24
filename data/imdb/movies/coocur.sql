drop table if exists cooccur;
create table cooccur as
select a.artist_id as artist_id_a, aa.artist as artist_a,
  b.artist_id artist_id_b, ab.artist as artist_b
from context as a
join context as b on b.release_group = a.release_group
join artist_agg as aa on aa.artist_id = a.artist_id
join artist_agg as ab on ab.artist_id = b.artist_id
where a.artist_id < b.artist_id
and aa.count > 50 
and ab.count > 50
;

select c.artist_a, c.artist_b, count(*) as count
from cooccur as c
group by 1, 2
having count(*) > 100
order by count(*) desc
;

