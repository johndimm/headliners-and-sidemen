psql -f high_rated.sql
psql -f person-year.sql
psql -f rank-year.sql
python3 rank-year.py > rank-year.html

#psql -f person-agg-year.sql
#psql -f list.sql
#python3 html.py > directors.html
