drop table if exists c_sib;

create table c_sib as
with uniq as (
select release_group, min(begin_date) as begin_date
from context
group by 1
order by 1
)
select
c1.*,
min(c2.begin_date) as sibling_begin_date 
from context c1
join uniq c2 on c2.release_group = c1.release_group
group by 1,2,3,4,5,6,7,8,9,10
;
