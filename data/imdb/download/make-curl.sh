cat index.html | grep "a href" |  grep "datasets" | sed -E 's/.*href=([^>]*)>.*/curl -o \1 "\1"/' > t
cat t | sed "s#-o https://datasets.imdbws.com/#-o #" > run.sh
chmod a+x run.sh
cat run.sh

