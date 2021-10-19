drop table if exists c_date;
create table c_date as
select
release_group,
title,
headliner,
headliner_id,
artist,
artist_id,
instrument,
coalesce(begin_date, sibling_begin_date, make_date(release_year, 1, 1)) as begin_date
from c_sib
;
