drop table if exists title_akas;
create table title_akas (
    titleId text, -- (string) - a tconst, an alphanumeric unique identifier of the title
    ordering int, -- (integer) – a number to uniquely identify rows for a given titleId
    title text, -- (string) – the localized title
    region text, -- (string) - the region for this version of the title
    language text, -- (string) - the language of the title
    types text, -- (array) - Enumerated set of attributes for this alternative title. One or more of the following: "alternative", "dvd", "festival", "tv", "video", "working", "original", "imdbDisplay". New values may be added in the future without warning
    attributes text, -- (array) - Additional terms to describe this alternative title, not enumerated
    isOriginalTitle boolean -- (boolean) – 0: not original title; 1: original title
);

\copy title_akas from 'title.akas.clean.tsv' with delimiter E'\t' csv header null as '\N';
