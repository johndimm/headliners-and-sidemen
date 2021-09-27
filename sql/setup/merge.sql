drop table if exists context;
create table context as
select c.*, cov.url as cover_url
from context_xfer c
left join covers as cov on cov.id = c.release_group
limit 2000000
;

