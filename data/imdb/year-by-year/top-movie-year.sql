drop view if exists top_movie_year;
drop table if exists tmy;

create table tmy as
select
    tb.startYear,
    tb.primaryTitle,
    tb.genres,
    tb.tconst,
    tb.titleType,
    cast(
        rank() OVER (
            PARTITION BY tb.startYear
            ORDER BY
                tr.averageRating * tr.numVotes DESC
        ) as int
    ) as rank,
    to_tsvector('english', tb.primaryTitle) as fulltext
from
    title_basics as tb
    join title_ratings as tr on tr.tconst = tb.tconst 
where
--    tb.titleType = 'movie'
    tb.titleType = 'tvSeries'
-- like 'tv%'
;

drop table if exists top_movie_year;
drop view if exists top_movie_year;
create view top_movie_year as
select 
    startYear,
    rc.cover_url,
    primaryTitle,
    genres,
    tmy.tconst,
    titleType,
    rank,
    fulltext
from tmy
left join release_cover as rc on rc.release_group = tmy.tconst
;


create index idx_tmy_start on tmy(startYear);
create index idx_tmy_rank on tmy(rank);
create index idx_tmy_genres on tmy(genres);
create index idx_tmy_type on tmy(titleType);
create index ON tmy USING GIN (fulltext);

-- \copy top_movie_year to 'top_movie_year.tsv' delimiter E'\t' csv header;
