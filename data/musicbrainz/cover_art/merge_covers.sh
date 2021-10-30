cp covers_v1.tsv t
cat covers_v2.tsv >> t
sort t | uniq > covers.tsv
wc -l covers*
