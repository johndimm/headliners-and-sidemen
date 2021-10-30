drop table if exists director_context;

create table director_context as
with directors as (
select tconst, unnest(string_to_array(directors,',')) as director
from title_crew 
),
samples as (
select distinct release_group, title, begin_date, cover_url
from staging.context
) 
select release_group, 
  title, 
  '' as headliner, 
  '' as headliner_id, 
  nb.primaryName as artist, 
  directors.director as artist_id, 
  'director' as instrument, 
  begin_date,
  cast(extract (year from begin_date) as int) - cast(nb.birthYear as int) as age,
  cover_url,
    to_tsvector('english', title || ' ' || nb.primaryName) as fulltext,
    cast(ROW_NUMBER() OVER (PARTITION by directors.director 
    ORDER BY begin_date 
    ) as int) as artist_seq
from directors 
join name_basics as nb on nb.nconst = directors.director
join samples as s on s.release_group = directors.tconst
limit 100
;

\x
select * from director_context;
