# in source db, e.g.
#    env local_music
# psql -f dump.sql

# in target db
#  env gce_music
psql -f create_context.sql
psql -f load.sql
psql -f index.sql
psql -f ../transform/functions.sql

