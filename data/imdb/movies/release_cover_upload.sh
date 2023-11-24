. ~/.bash_aliases
env gce_movies_postgres
psql -f "truncate release_cover;"
psql -f "\copy release_cover from release_cover_local.tsv;"
