ALTER TABLE public.context OWNER TO postgres;

--
-- Name: idx_con_aid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_con_aid ON public.context USING btree (artist_id);


--
-- Name: idx_con_artist; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_con_artist ON public.context USING btree (artist);


--
-- Name: idx_con_artseq; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_con_artseq ON public.context USING btree (artist_id, artist_seq);


--
-- Name: idx_con_rg; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_con_rg ON public.context USING btree (release_group);


--
-- Name: idx_con_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_con_title ON public.context USING btree (title);


--
-- Name: idx_context_gin; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_context_gin ON public.context USING gin (fulltext);


--
-- PostgreSQL database dump complete
--

