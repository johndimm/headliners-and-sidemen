drop table if exists movie_covers;
create table movie_covers as
select tconst, cover_url
from top_movie_year
where cover_url is not null
;

select count(*)
from movie_covers;

insert into movie_covers
select rc.release_group as tconst, rc.cover_url
from release_cover as rc
left join movie_covers as mc on mc.tconst = rc.release_group
where mc.tconst is null
;

select count(*)
from movie_covers;
