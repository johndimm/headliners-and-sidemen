drop table if exists best_actor;
create temporary table best_actor as
select
    *
from
    actors
order by
    sum_value desc
limit 10000
;

\copy best_actor to best_actor.tsv delimiter E'\t' csv header;
