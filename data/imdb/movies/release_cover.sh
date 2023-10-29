rm *.tsv

# env gce_movies_postgres
psql -f pix_gce_context.sql
psql -f pix_gce_top.sql

# env local_movies_postgres
psql -f pix_local_top.sql
cat *.tsv > pix.tsv
sort pix.tsv | uniq > pixu.tsv

psql -f pix_table_create.sql
