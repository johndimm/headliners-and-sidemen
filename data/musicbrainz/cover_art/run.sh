# python3 covers.py
wc -l covers.tsv
cat data/* > c.tsv
cat c.tsv | sed 's/http:/https:/' > covers.tsv
wc -l covers.tsv
