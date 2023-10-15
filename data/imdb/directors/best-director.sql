drop table if exists best_director;
create temporary table best_director as
select
    *
from
    directors
order by
    sum_value desc
limit 10000
;

\copy best_director to best_director.tsv delimiter E'\t' csv header;
