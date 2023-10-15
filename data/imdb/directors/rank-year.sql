drop table if exists rank_year;
create table rank_year as
select 
  a.startYear, a.nconst, a.primaryName, a.category, sum(b.sum_value) as sum_value
from  
  directors as a 
join 
  directors as b on b.nconst = a.nconst and b.category = a.category
where 
  b.startYear = a.startYear
group by  
  1,2,3,4
order by a.startYear desc, 5 desc
;

\copy rank_year to rank_year.tsv delimiter E'\t' csv header;