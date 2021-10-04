create index idx_tp_tconst on title_principals(tconst);
create index idx_tp_nconst on title_principals(nconst);

create index idx_tb_tconst on title_basics(tconst);
create index idx_nb_nconst on name_basics(nconst);

create index idx_tc_tconst on title_crew(tconst);

create index idx_tb_primaryTitle on title_basics(primaryTitle);
create index idx_nb_primaryName on name_basics(primaryName);

