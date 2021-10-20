drop table if exists staging.context;
CREATE TABLE staging.context (
    release_group text,
    title character varying,
    headliner character varying,
    headliner_id text,
    artist character varying,
    artist_id text,
    instrument text,
    begin_date date,
    age int,
    cover_url text,
    fulltext tsvector,
    artist_seq integer
);
