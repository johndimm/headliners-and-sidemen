drop table if exists groups_with_movies;
create table groups_with_movies as
select 
    A_nconst,
    A_primaryName,
    collaborator_names,
    collaborators,
    A_category,
    p.start,
    p.end,
    rating,
    num_movies,

   tb.startYear,
   tb.primaryTitle,
   tb.genres,
   rc.cover_url,
   tp_A.tconst,
   tr.averageRating,
   tr.numVotes


from pairs_names as p
join title_principals as tp_A on tp_A.nconst = p.A_nconst
join title_principals as tp_B on tp_B.nconst = p.collaborators[1] and tp_B.tconst = tp_A.tconst
join name_basics as nb on nb.nconst = tp_B.nconst
join title_basics as tb on tb.tconst = tp_B.tconst
join title_ratings as tr on tr.tconst = tp_B.tconst
left outer join release_cover as rc on rc.release_group = tp_B.tconst
-- group by 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
order by p.rating desc, p.A_nconst, p.start
;

create index idx_groups_ar on groups_with_movies(a_nconst, rating);

\copy groups_with_movies to 'groups_with_movies.tsv' delimiter E'\t' csv;