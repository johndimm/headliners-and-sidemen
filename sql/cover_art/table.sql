drop table if exists context.covers;

create table context.covers (
  id int,
  gid uuid,
  url text
);

\copy context.covers from 'covers.tsv';

create index idx_cov_id on context.covers(id);


