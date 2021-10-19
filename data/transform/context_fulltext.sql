drop table if exists context_fulltext;

create  table context_fulltext as
select c.*, to_tsvector('english', c.title || ' ' || c.artist || ' ' || c.headliner) as fulltext
from context_cover as c
;

create index idx_conft_aid on context_fulltext(artist_id);
