drop temporary table if exists uniq;
create temporary table uniq as 
  select distinct release_group
  from old.context
  where cover_url is not null
;
create index idx_uniq_rel on uniq(release_group);

select distinct coalesce(c1.cover_url, c2.cover_url)
from uniq
join context as c1 on c1.release_group = uniq.release_group
join context as c2 on c2.release_group = c1.release_group
  and c2.artist_id = c1.artist_id
  and c2.begin_date = c1.begin_date
;

/*
-- select count(*) from (
;
select distinct oc.release_group, oc.artist_id, oc.cover_url --  oc.title, oc.cover_url
from old.context as oc
left join context as c on c.release_group = oc.release_group and c.artist_id = oc.artist_id
where c.release_group is null 
and oc.cover_url is not null
and c.cover_url is null
 ) as t;
;
*/

