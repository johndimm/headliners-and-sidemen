set search_path=tv;

drop index if exists idx_con_title;
drop index if exists idx_con_artist;
drop index if exists idx_con_aid;

create index idx_con_title on context(title);
create index idx_con_artist on context(artist);

create index idx_con_rg on context(release_group);
create index idx_con_aid on context(artist_id);

drop index if exists idx_context_gin;
CREATE INDEX idx_context_gin ON context USING GIN (fulltext);

create index idx_con_artseq on context(artist_id, artist_seq);

