drop table if exists context.collab;

create table context.collab as
select c.*, cov.url as cover_url
from context.context c
left join context.covers as cov on cov.id = c.release_group
;

create index idx_col_title on context.collab(title);
create index idx_col_artist on context.collab(artist);

create index idx_col_rg on context.collab(release_group);
create index idx_col_aid on context.collab(artist_id);
