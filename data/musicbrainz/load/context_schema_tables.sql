--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Debian 12.8-1.pgdg100+1)
-- Dumped by pg_dump version 13.4


drop table if exists artist;
CREATE TABLE artist (
    id integer,
    gid uuid,
    name character varying,
    sort_name character varying,
    begin_date_year smallint,
    begin_date_month smallint,
    begin_date_day smallint,
    end_date_year smallint,
    end_date_month smallint,
    end_date_day smallint,
    type integer,
    area integer,
    gender integer,
    comment character varying(255),
    edits_pending integer,
    last_updated timestamp with time zone,
    ended boolean,
    begin_area integer,
    end_area integer
);

\copy artist from 'artist';




--
-- Name: context; Type: TABLE; Schema: context; Owner: musicbrainz
--

--
-- Name: instrument; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE instrument (
    id integer,
    gid uuid,
    name character varying,
    type integer,
    edits_pending integer,
    last_updated timestamp with time zone,
    comment character varying(255),
    description text
);

\copy instrument from 'instrument';


--
-- Name: l_artist_instrument; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE l_artist_instrument (
    id integer,
    link integer,
    entity0 integer,
    entity1 integer,
    edits_pending integer,
    last_updated timestamp with time zone,
    link_order integer,
    entity0_credit text,
    entity1_credit text
);

\copy l_artist_instrument from 'l_artist_instrument';



--
-- Name: l_artist_recording; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE l_artist_recording (
    id integer,
    link integer,
    entity0 integer,
    entity1 integer,
    edits_pending integer,
    last_updated timestamp with time zone,
    link_order integer,
    entity0_credit text,
    entity1_credit text
);

\copy l_artist_recording from 'l_artist_recording';


--
-- Name: l_recording_release; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE l_recording_release (
    id integer,
    link integer,
    entity0 integer,
    entity1 integer,
    edits_pending integer,
    last_updated timestamp with time zone,
    link_order integer,
    entity0_credit text,
    entity1_credit text
);

\copy l_recording_release from 'l_recording_release';



--
-- Name: link; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE link (
    id integer,
    link_type integer,
    begin_date_year smallint,
    begin_date_month smallint,
    begin_date_day smallint,
    end_date_year smallint,
    end_date_month smallint,
    end_date_day smallint,
    attribute_count integer,
    created timestamp with time zone,
    ended boolean
);

\copy link from 'link';



--
-- Name: link_attribute; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE link_attribute (
    link integer,
    attribute_type integer,
    created timestamp with time zone
);

\copy link_attribute from 'link_attribute';


--
-- Name: link_attribute_type; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE link_attribute_type (
    id integer,
    parent integer,
    root integer,
    child_order integer,
    gid uuid,
    name character varying(255),
    description text,
    last_updated timestamp with time zone
);

\copy link_attribute_type from 'link_attribute_type';



--
-- Name: medium; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE medium (
    id integer,
    release integer,
    "position" integer,
    format integer,
    name character varying,
    edits_pending integer,
    last_updated timestamp with time zone,
    track_count integer
);

\copy medium from 'medium';



--
-- Name: recording; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE recording (
    id integer,
    gid uuid,
    name character varying,
    artist_credit integer,
    length integer,
    comment character varying(255),
    edits_pending integer,
    last_updated timestamp with time zone,
    video boolean
);

\copy recording from 'recording';


--
-- Name: release; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE release (
    id integer,
    gid uuid,
    name character varying,
    artist_credit integer,
    release_group integer,
    status integer,
    packaging integer,
    language integer,
    script integer,
    barcode character varying(255),
    comment character varying(255),
    edits_pending integer,
    quality smallint,
    last_updated timestamp with time zone
);

\copy release from 'release';



--
-- Name: release_group; Type: TABLE; Schema: context; Owner: musicbrainz
--

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

\copy release_group from 'release_group';



--
-- Name: track; Type: TABLE; Schema: context; Owner: musicbrainz
--

CREATE TABLE track (
    id integer,
    gid uuid,
    recording integer,
    medium integer,
    "position" integer,
    number text,
    name character varying,
    artist_credit integer,
    length integer,
    edits_pending integer,
    last_updated timestamp with time zone,
    is_data_track boolean
);

\copy track from 'track';


--
-- Name: idx_ar; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_ar ON l_artist_recording USING btree (id);


--
-- Name: idx_artist_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_artist_id ON artist USING btree (id);


--
-- Name: idx_artist_name; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_artist_name ON artist USING btree (name);


--
-- Name: idx_e0; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_e0 ON l_artist_recording USING btree (entity0);


--
-- Name: idx_e1; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_e1 ON l_artist_recording USING btree (entity1);


--
-- Name: idx_la_atype; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_la_atype ON link_attribute USING btree (attribute_type);


--
-- Name: idx_la_link; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_la_link ON link_attribute USING btree (link);


--
-- Name: idx_lat_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_lat_id ON link_attribute_type USING btree (id);


--
-- Name: idx_link_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_link_id ON link USING btree (id);


--
-- Name: idx_med_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_med_id ON medium USING btree (id);


--
-- Name: idx_med_rel; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_med_rel ON medium USING btree (release);


--
-- Name: idx_recording_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_recording_id ON recording USING btree (id);


--
-- Name: idx_recording_name; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_recording_name ON recording USING btree (name);


--
-- Name: idx_rel_artist; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_rel_artist ON release USING btree (artist_credit);


--
-- Name: idx_rel_rg; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_rel_rg ON release USING btree (release_group);


--
-- Name: idx_release_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_release_id ON release USING btree (id);


--
-- Name: idx_release_name; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_release_name ON release USING btree (name);


--
-- Name: idx_rg_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_rg_id ON release_group USING btree (id);


--
-- Name: idx_rg_name; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_rg_name ON release_group USING btree (name);


--
-- Name: idx_rr; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_rr ON l_recording_release USING btree (id);


--
-- Name: idx_rr_e0; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_rr_e0 ON l_recording_release USING btree (entity0);


--
-- Name: idx_rr_e1; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_rr_e1 ON l_recording_release USING btree (entity1);


--
-- Name: idx_tr_id; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_tr_id ON track USING btree (id);


--
-- Name: idx_tr_med; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_tr_med ON track USING btree (medium);


--
-- Name: idx_tr_rec; Type: INDEX; Schema: context; Owner: musicbrainz
--

CREATE INDEX idx_tr_rec ON track USING btree (recording);


--
-- PostgreSQL database dump complete
--

