drop table if exists title_principals;

create table title_principals (
    tconst text, -- (string) - alphanumeric unique identifier of the title
    ordering int, -- (integer) – a number to uniquely identify rows for a given titleId
    nconst text, -- (string) - alphanumeric unique identifier of the name/person
    category text, -- (string) - the category of job that person was in
    job text, -- (string) - the specific job title if applicable, else '\N'
    characters text -- (string) - the name of the character played if applicable, else '\N'
);

\copy title_principals from 'title.principals.clean.tsv' with delimiter E'\t' csv header null as '\N';
