drop table if exists name_basics;

create table name_basics (
    nconst text, --(string) - alphanumeric unique identifier of the name/person
    primaryName text, -- (string)– name by which the person is most often credited
    birthYear int, --– in YYYY format
    deathYear int, ---– in YYYY format if applicable, else '\N'
    primaryProfession text, -- (array of strings)– the top-3 professions of the person
    knownForTitles text -- (array of tconsts) – titles the person is known for
);

\copy name_basics from 'name.basics.clean.tsv' with delimiter E'\t' csv header null as '\N';
