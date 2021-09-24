set search_path=context;

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
    end_date date
);

drop table if exists release_group;
CREATE TABLE release_group (
    id integer,
    gid uuid,
    name character varying,
    artist_credit integer,
    type integer,
    comment character varying(255),
    edits_pending integer,
    last_updated timestamp with time zone
);