\copy (select distinct release_group from context order by 1 desc) to movies.dat;

