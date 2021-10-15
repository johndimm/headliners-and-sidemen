-- drop table if exists staging.context;
create table staging.context as
select
release_group,
cast (null as uuid) as release_group_gid,
title,
headliner,
headliner_id,
artist,
artist_id,
cast(instrument as text) as instrument,
begin_date,
cover_url,
fulltext,
artist_seq
from public.context
;

