create temporary table t as 
select distinct rg.id, rg.gid 
from context.context as c 
join context.release_group as rg on rg.id = c.release_group
;

\copy t to 'gid.tsv';
;
