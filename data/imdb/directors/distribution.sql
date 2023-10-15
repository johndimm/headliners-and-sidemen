\set div 100

select cast(numVotes / :div as int) * :div, count(*)
from public.title_ratings
group by 1
order by 1
;
