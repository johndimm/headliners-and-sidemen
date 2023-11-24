select a.cover_url = b.cover_url, count(*)
from release_cover a
join top_movie_year b on b.tconst = a.release_group
group by 1
;
