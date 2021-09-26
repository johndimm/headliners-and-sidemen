-- set search_path=context;

drop table if exists context_xfer;
CREATE TABLE context_xfer (
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

drop table if exists covers;
create table covers (
  id int,
  gid uuid,
  url text
);


