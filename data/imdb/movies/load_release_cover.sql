drop table if exists rc;
create temporary table rc (
    release_group text,
    cover_url text
);

\copy rc from pixu.tsv delimiter E'\t';

delete from rc
where release_group like 'ttt%';

drop table if exists release_cover;
create table release_cover as
select release_group, min(cover_url) as cover_url
from rc
group by 1;


create unique index idx_rc on release_cover(release_group);
