set search_path=tv;

alter table context
add column
fulltext tsvector;

