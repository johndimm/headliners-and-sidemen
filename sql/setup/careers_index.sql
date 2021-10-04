set search_path=tv;

create index idx_con_artseq on context(artist_id, artist_seq);
