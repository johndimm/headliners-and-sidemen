drop table if exists context_2films;
create table context_2films as
with twofilms as ( 
  select *
  from artist_agg
  where count = 2
)
select c.*
from context as c
join twofilms as tf on tf.artist_id = c.artist_id
;

select count(*)
from context_2films
;
