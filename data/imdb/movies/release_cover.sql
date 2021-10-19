drop table if exists release_cover;
create table release_cover as
select 
  distinct concat('tt', LPAD(cast(c.release_group as text), 7, '0')), c.cover_url
from public.context c
where c.cover_url is not null
;

\copy release_cover to 'release_cover.tsv';
