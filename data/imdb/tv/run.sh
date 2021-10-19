source ../../../env/gce_tv
psql -f release_cover.sql

source ../../../env/local_movies
psql -U postgres -f load_release_cover.sql
psql -U postgres -f build.sql
psql -U postgres -f download.sql

. ../../../env/local_tv
psql -f create_context.sql
psql -c "\copy staging.context from context.tsv;"

psql -f index.sql
psql -f ../../transform/functions.sql
