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
-- Name: top_movie_year; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.top_movie_year (
    startyear integer,
    cover_url text,
    primarytitle text,
    genres text,
    tconst text,
    titletype text,
    rank integer
);


ALTER TABLE public.top_movie_year OWNER TO postgres;

--
-- Name: idx_tmy_genres; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tmy_genres ON public.top_movie_year USING btree (genres);


--
-- Name: idx_tmy_rank; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tmy_rank ON public.top_movie_year USING btree (rank);


--
-- Name: idx_tmy_start; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tmy_start ON public.top_movie_year USING btree (startyear);


--
-- Name: idx_tmy_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tmy_type ON public.top_movie_year USING btree (titletype);


--
-- PostgreSQL database dump complete
--

