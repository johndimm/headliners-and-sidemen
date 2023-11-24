drop view if exists context;
drop view if exists top_movie_year;

-- Take only the v0 images that are unique.
drop table if exists rc;
create table rc as
select release_group, max(cover_url) as cover_url
from release_cover_v0
group by 1
having count(*) = 1
;
drop table release_cover;
alter table rc rename to release_cover;

create unique index idx_rc on release_cover(release_group);

