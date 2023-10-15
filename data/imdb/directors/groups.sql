drop table if exists groups;

--
-- List the groups with more than 2 people.
--
create table groups as
with threeplus as (
    select A_nconst, rating, count(*)
    from pairs
    group by 1, 2
    having count(*) > 1
)
select p.A_nconst, p.rating, array_agg(p.collaborators[1]) as collaborators
from pairs as p
join threeplus as tp on tp.A_nconst = p.A_nconst and tp.rating = p.rating
group by 1, 2
order by rating desc
;

--
-- Replace the multiple lines with one for the whole group.
--
update pairs as p
set collaborators = g.collaborators
from groups as g
where p.A_nconst = g.A_nconst 
and p.rating = g.rating 
and p.collaborators[1] = g.collaborators[1]
;

--
-- Delete the multiple lines.

delete from pairs as p
using groups as g
where p.A_nconst = g.A_nconst
and p.rating = g.rating
and p.collaborators[1] = ANY(g.collaborators)
and array_length(p.collaborators,1) = 1
;

