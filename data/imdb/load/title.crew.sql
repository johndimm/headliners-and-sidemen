drop table if exists title_crew;

create table title_crew (
    tconst text, --(string) - alphanumeric unique identifier of the title
    directors text, --(array of nconsts) - director(s) of the given title
    writers text -- (array of nconsts) – writer(s) of the given title
);

\copy title_crew from 'title.crew.clean.tsv' with delimiter E'\t' csv header null as '\N';