-- set search_path=tv;

create  table context_ft as
select c.*, to_tsvector('english', c.title || ' ' || c.artist) as fulltext
from context as c
;

drop table context;
alter table context_ft rename to context;
