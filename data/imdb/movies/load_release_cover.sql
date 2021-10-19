drop table if exists release_cover;
create table release_cover
(
  release_group text,
  cover_url text
);

\copy release_cover from 'release_cover.tsv';

