psql -f director_movie.sql

psql -f pairs.sql
psql -f groups.sql

echo "pairs names"
psql -f pairs_names.sql
psql -c "select 'pairs names', count(*) from pairs_names;"

echo "groups with movies"
psql -f groups_with_movies.sql
psql -c "select 'groups with movies', count(*) from groups_with_movies;"

python3 pairs_html.py



#psql -f list.sql
#python3 html.py > directors.html

# psql -f trios.sql
