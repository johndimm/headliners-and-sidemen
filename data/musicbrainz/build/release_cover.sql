drop table if exists release_cover;
create table release_cover as
select 
release_group,
min(cover_url) as cover_url
from public.context
where cover_url is not null
group by 1
;
