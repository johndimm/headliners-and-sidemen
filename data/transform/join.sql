-- alter table context rename to context_v0;

-- drop table if exists context;

create table context as
select c.*, rg.gid as release_group_gid
from context_v0 as c
join release_group as rg on rg.id = c.release_group
;

create index idx_co_title on context(title);
create index idx_co_headliner on context(headliner);
create index idx_co_artist on context(artist);
create index idx_co_gid on context(release_group_gid));