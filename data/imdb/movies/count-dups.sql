select release_group, count(*)
from release_cover
group by 1
having count(*) > 1
;
