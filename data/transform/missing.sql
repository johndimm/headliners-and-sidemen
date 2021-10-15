select distinct co.release_group, title, artist
from old.context as co
join context_missing as cm on cm.release_group = co.release_group
;
