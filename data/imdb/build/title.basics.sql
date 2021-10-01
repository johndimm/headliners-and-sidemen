drop table if exists title_basics;

create table title_basics (
    tconst text, -- (string) - alphanumeric unique identifier of the title
    titleType text, -- (string) – the type/format of the title (e.g. movie, short, tvseries, tvepisode, video, etc)
    primaryTitle text, -- (string) – the more popular title / the title used by the filmmakers on promotional materials at the point of release
    originalTitle text, -- - (string) original title, in the original language
    isAdult boolean, -- (boolean) - 0: non-adult title; 1: adult title
    startYear int, -- (YYYY) – represents the release year of a title. In the case of TV Series, it is the series start year
    endYear int, -- (YYYY) – TV Series end year. ‘\N’ for all other title types
    runtimeMinutes int, -- – primary runtime of the title, in minutes
    genres text -- (string array) – includes up to three genres associated with the title
);

\copy title_basics from 'title.basics.clean.tsv' with delimiter E'\t' csv header null as '\N';
