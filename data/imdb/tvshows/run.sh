#psql -f build.sql
#psql -f index.sql
#psql -c '\copy context to context.tsv'
psql -f  create_context.sql
psql -c "\copy context from 'context.tsv';"
psql -f index2.sql
