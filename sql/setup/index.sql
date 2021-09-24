set search_path=context;

create index idx_c_title on context(title);
create index idx_c_headliner on context(headliner);
create index idx_c_artist on context(artist);

CREATE INDEX idx_rg_id ON release_group USING btree (id);
CREATE INDEX idx_rg_name ON release_group USING btree (name);