update staging.context as c
set instrument = 'director'
from public.director_context as dc
where dc.release_group = c.release_group
and dc.artist_id = c.artist_id
and (c.instrument is null or c.instrument = '')
;
