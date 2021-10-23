truncate table release_cover;
\copy release_cover from '../cover_art/covers.tsv';

select count(*) from release_cover;
