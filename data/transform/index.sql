create index idx_con_title on context_base(title);
create index idx_con_artist on context_base(artist);

create index idx_con_rg on context_base(release_group);
create index idx_con_aid on context_base(artist_id);

CREATE INDEX idx_context_base_gin ON context_base USING GIN (fulltext);

create index idx_con_artseq on context_base(artist_id, artist_seq);

