--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: context; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.context (
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
    fulltext tsvector,
    artist_seq integer
);
