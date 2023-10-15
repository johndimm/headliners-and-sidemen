drop table if exists pairs;

create table pairs as
select
    a.nconst as A_nconst,
    a.primaryName as A_primaryName,
    a.category as A_category,

    ARRAY[b.nconst] as collaborators,

    min(a.startYear) as start,
    max(a.startYear) as end,
    cast (sum (a.averageRating * a.numVotes) as int) as rating,
    count(*) num_movies
from
    director_movie as a
    join director_movie as b using (tconst)
where
    (
        a.category > b.category
        or (
            a.category = b.category
            and a.nconst < b.nconst
        )
    )
    and a.category = 'director'
    and b.category in ('actor', 'actress')
    -- and a.startYear between 1940 and 1963
group by
    1,
    2,
    3,
    4
having
    count(*) > 2
order by
    7 desc
-- limit 100
;

\copy pairs to pairs.tsv delimiter E'\t' CSV header;
