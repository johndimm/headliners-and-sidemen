drop table if exists c_sib;

create table c_sib as
with last_recording_date as (
select release_group, max(begin_date) as begin_date
from context
group by 1
order by 1
)
select
c1.*,
max(c2.begin_date) as sibling_begin_date 
from context c1
join last_recording_date as c2 on c2.release_group = c1.release_group
group by 1,2,3,4,5,6,7,8,9,10,11
;
