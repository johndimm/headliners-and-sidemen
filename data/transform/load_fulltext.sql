drop table if exists context_ft;

create  table context_ft as
select c.*, to_tsvector('english', c.title || ' ' || c.artist || ' ' || c.headliner) as fulltext
from context_cover as c
;
