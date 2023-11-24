drop view if exists context;
create view context as
select
    cb.release_group,
    title,        
    headliner,    
    headliner_id, 
    artist,       
    artist_id,    
    instrument,   
    begin_date,   
    age,   
    coalesce(rc.cover_url, '') as cover_url,       
    fulltext,     
    artist_seq
from context_base as cb
left join release_cover as rc on rc.release_group = cb.release_group
;
