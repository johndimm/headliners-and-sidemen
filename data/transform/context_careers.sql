drop table if exists context_careers;
create table context_careers as
select c.*,
  cast(
      ROW_NUMBER() OVER (
      PARTITION by c.artist_id
      ORDER BY c.begin_date
    ) as int) as artist_seq
from context_fulltext as c 
;


