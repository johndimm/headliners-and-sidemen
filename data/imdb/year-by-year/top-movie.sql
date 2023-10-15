drop table if exists top_movie;
create table top_movie as

        select
            tb.startYear,
            tb.primaryTitle,
            tb.genres,
            
            tr.averageRating,
            tr.numVotes
            
        from
            title_basics as tb
            join title_ratings as tr on tr.tconst = tb.tconst
        where tr.numVotes > 100
        order by tr.averageRating * tr.numVotes desc
        limit 100
;

/*
 title_basics as tb 
 join title_ratings as tr on tr.tconst = tb.tconst
 left outer join release_cover as rc on rc.release_group = tb.tconst
 
 where tb.startYear between 1990 and 1995
 */
/*
 and rank < 3
 
 -- order by tb.startYear desc, tr.averageRating * tr.numVotes desc
 limit 10
 ;
 
 */
 -- create index idx_my_ar on top_movie_year(tconst, rating);
 
 \copy top_movie to 'top_movie.tsv' delimiter E'\t' csv header;
 
