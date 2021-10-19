source ../../../env/gce_movies
psql -f release_cover.sql

source ../../../env/local_movies
psql -f load_release_cover.sql

psql -f build.sql
psql -f index.sql
psql -f ../../transform/functions.sql
