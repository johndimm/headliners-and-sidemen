drop table if exists c_agg;
create table c_agg as
with instruments as (
    select
    release_group,
    release_group_gid,
    title,
    headliner,
    headliner_id,
    artist,
    artist_id,
    instrument,
    min(begin_date) as begin_date
    from c_date 
    group by 1,2,3,4,5,6,7,8  
)
select
release_group,
release_group_gid,
title,
headliner,
headliner_id,
artist,
artist_id,
string_agg(instrument, ', ') as instrument,
min(begin_date) as begin_date
from instruments
group by 1,2,3,4,5,6,7
;
