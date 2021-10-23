select  
case when l.lanname = 'internal' then p.prosrc                                                                                                             else pg_get_functiondef(p.oid)                                                                                                                        end as definition
from pg_proc p
left join pg_namespace n on p.pronamespace = n.oid left join pg_language l on p.prolang = l.oid left join pg_type t on t.oid = p.prorettype
where n.nspname not in ('pg_catalog', 'information_schema')
and p.proname = 'update_imdb_cover_art'
;
