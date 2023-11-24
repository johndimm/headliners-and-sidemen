. ~/.bash_aliases
env local_movies_postgres
psql -c "\copy release_cover to release_cover_local.tsv delimiter E'\t'"

