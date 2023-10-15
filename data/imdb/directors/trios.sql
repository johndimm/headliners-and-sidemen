drop table if exists trios;
create table trios as
select
  pa.A_primaryName, pa.A_nconst, 
  pa.B_primaryName, pa.B_nconst, 
  pb.B_primaryName as B2_primaryName , pb.B_nconst as B2_nconst, 
  pa.num_movies, pa.rating
from pairs as pa
join pairs as pb using (a_nconst, rating, num_movies)
where 
-- pa.b_nconst != pb.b_nconst
-- and 
pa.B_nconst < pb.B_nconst
order by pa.rating desc
;

select
A_primaryName, A_nconst, rating, count(*) as num_trios 
from trios as t 
group by 1,2,3
having count(*) >= 3
;
