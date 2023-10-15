drop table if exists tmp;
create table tmp as
select numVotes, count(*)
from title_ratings
group by 1
order by 1
;
\copy tmp to 'numvotes.tsv' delimiter E'\t' csv header;
