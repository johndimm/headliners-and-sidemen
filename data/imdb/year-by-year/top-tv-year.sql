drop view if exists top_tv_year;
drop table if exists tty;

create table tty as
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
    tb.titleType like 'tv%'
;

drop table if exists top_tv_year;
drop view if exists top_tv_year;
create view top_tv_year as
select 
    startYear,
    rc.cover_url,
    primaryTitle,
    genres,
    tty.tconst,
    titleType,
    rank,
    fulltext
from tty
left join release_cover as rc on rc.release_group = tty.tconst
;


create index idx_tty_start on tty(startYear);
create index idx_tty_rank on tty(rank);
create index idx_tty_genres on tty(genres);
create index idx_tty_type on tty(titleType);
create index ON tty USING GIN (fulltext);

-- \copy top_tv_year to 'top_tv_year.tsv' delimiter E'\t' csv header;
