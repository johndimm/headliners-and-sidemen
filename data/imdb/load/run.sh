cat ../download/title.akas.tsv | sed 's/"/""/g' > title.akas.clean.tsv 
psql -f title.akas.sql

cat ../download/title.basics.tsv | sed 's/"/""/g' > title.basics.clean.tsv
psql -f title.basics.sql 

cat ../download/name.basics.tsv | sed 's/"/""/g' > name.basics.clean.tsv
psql -f name.basics.sql 

cat ../download/title.principals.tsv | sed 's/"/""/g' > title.principals.clean.tsv
psql -f title.principals.sql 

cat ../download/title.crew.tsv | sed 's/"/""/g' > title.crew.clean.tsv
psql -f title.crew.sql 

cat ../download/title.episode.tsv | sed 's/"/""/g' > title.episode.clean.tsv
psql -f title.episode.sql 

cat ../download/title.ratings.tsv | sed 's/"/""/g' > title.ratings.clean.tsv
psql -f title.ratings.sql 

psql -f index.sql




