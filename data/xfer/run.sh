# in source db
# psql -f dump.sql

# in target db
psql -f create_context.sql
psql -f load.sql
psql -f index.sql
psql -f ../transform/functions.sql

