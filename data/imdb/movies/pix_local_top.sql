drop table if exists release_cover;
create temporary table release_cover as
select tconst, cover_url
from top_movie_year
where cover_url is not null
and cover_url != ''
;

\copy release_cover to 'pix_local_top.tsv';
