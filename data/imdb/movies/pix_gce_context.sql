drop table if exists release_cover;
create table release_cover as
select 
  distinct c.release_group, c.cover_url
from public.context c
where c.cover_url is not null
;

\copy release_cover to 'pix_gce_context.tsv';
