#cat title.akas.tsv | sed 's/"/""/g' > title.akas.clean.tsv 
#psql -f title.akas.sql

#cat title.basics.tsv | sed 's/"/""/g' > title.basics.clean.tsv
#psql -f title.basics.sql 

#cat name.basics.tsv | sed 's/"/""/g' > name.basics.clean.tsv
#psql -f name.basics.sql 

#cat title.principals.tsv | sed 's/"/""/g' > title.principals.clean.tsv
#psql -f title.principals.sql 

#cat title.crew.tsv | sed 's/"/""/g' > title.crew.clean.tsv
#psql -f title.crew.sql 

psql -f index.sql

psql -f build.sql

psql -f index2.sql


