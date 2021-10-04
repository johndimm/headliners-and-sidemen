drop table if exists title_episode;

create table title_episode (
  tconst text, -- (string) - alphanumeric identifier of episode
  parentTconst text, -- (string) - alphanumeric identifier of the parent TV Series
  seasonNumber int, -- (integer) – season number the episode belongs to
  episodeNumber int -- (integer) – episode number of the tconst in the TV series
);

\copy title_episode from 'title.episode.clean.tsv' with delimiter E'\t' csv header null as '\N';

create index idx_te_tconst on title_episode(tconst);
create index idx_te_parentTconst on title_episode(parentTconst);

