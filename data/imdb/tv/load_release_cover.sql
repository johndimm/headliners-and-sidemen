drop table if exists tv.release_cover;
create table tv.release_cover
(
  release_group text,
  cover_url text
);

\copy tv.release_cover from 'release_cover.tsv';

