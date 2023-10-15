drop table if exists pairs_with_movies;
create table pairs_with_movies as
select p.*, 

    tb.startYear,
    tb.primaryTitle,
    tb.genres,
    rc.cover_url,
    tp_A.tconst,
    tr.averageRating,
    tr.numVotes

from pairs as p
join title_principals as tp_A on tp_A.nconst = p.A_nconst
join title_principals as tp_B on tp_B.nconst = p.B_nconst and tp_B.tconst = tp_A.tconst
join title_basics as tb on tb.tconst = tp_A.tconst
join title_ratings as tr on tr.tconst = tp_A.tconst
left outer join release_cover as rc on rc.release_group = tp_A.tconst
order by p.rating desc, p.A_nconst, p.B_nconst, p.start
;

create index idx_pairs_ar on pairs_with_movies(a_nconst, rating);

\copy pairs_with_movies to 'pairs_with_movies.tsv' delimiter E'\t' csv;