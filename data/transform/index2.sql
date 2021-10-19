create index idx_con_title on context(title);
create index idx_con_artist on context(artist);

create index idx_con_rg on context(release_group);
create index idx_con_aid on context(artist_id);

 create index idx_con_artseq on context(artist_id, artist_seq);
