create index idx_conft_aid on context_ft(artist_id);

drop table if exists careers;
create table careers as
select c.*,
  cast(
      ROW_NUMBER() OVER (
      PARTITION by c.artist_id
      ORDER BY c.begin_date
    ) as int) as artist_seq
from context_ft as c 
;


