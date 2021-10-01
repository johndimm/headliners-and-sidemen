drop table if exists context;
CREATE TABLE context (
    release_group integer,
    title character varying,
    headliner character varying,
    headliner_id integer,
    artist character varying,
    artist_id integer,
    instrument character varying(255),
    begin_date date,
    end_date date,
    cover_url text,
    fulltext tsvector 
);
