drop table if exists pairs_names;

create table pairs_names as 

with exploded_names as (
  select
    A_nconst,
    A_primaryName,
    A_category,
    collaborators,
    p.start,
    p.end,
    rating,
    num_movies,
    nb.primaryName,
    nb.nconst
from
  pairs as p
  join name_basics as nb on nb.nconst = any(collaborators)
)
select
  A_nconst,
  A_primaryName,
  A_category,
  collaborators,
  en.start,
  en.end,
  rating,
  num_movies,
  json_agg(json_build_array(primaryName, nconst)) as collaborator_names,
  count(*) as cnt
from
  exploded_names as en
group by
  1,
  2,
  3, 4,5,6,7,8

order by
  rating desc

  
  ;