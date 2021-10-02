drop table if exists careers;
create table careers as
select c.*,
cast(ROW_NUMBER() OVER (PARTITION by c.artist
    ORDER BY c.begin_date
    ) as int) as artist_seq
from context as c 
;


