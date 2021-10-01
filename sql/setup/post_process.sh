#psql -f add_fulltext.sql
# psql -f load_fulltext.sql
psql -f gin_index.sql
psql -f index2.sql
 
