create temporary table t as 
select distinct release_group, begin_date
from context 
where cover_url is null and begin_date is not null
order by begin_date desc
;

\copy t to 'gid.tsv';
;
