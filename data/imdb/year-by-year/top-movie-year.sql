drop table if exists top_movie_year;

create table top_movie_year as
select
    tb.startYear,
    rc.cover_url,
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
    ) as rank
from
    title_basics as tb
    join title_ratings as tr on tr.tconst = tb.tconst 
    left join release_cover as rc on rc.release_group = tb.tconst
where
    tb.titleType = 'movie'
;

create index idx_tmy_start on top_movie_year(startYear);
create index idx_tmy_rank on top_movie_year(rank);
create index idx_tmy_genres on top_movie_year(genres);
create index idx_tmy_type on top_movie_year(titleType);

-- \copy top_movie_year to 'top_movie_year.tsv' delimiter E'\t' csv header;