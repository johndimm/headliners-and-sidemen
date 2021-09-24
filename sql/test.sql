set search_path=context;

select * from get_artists(267);

select * from last_before(330578, '1976-01-01');
select * from first_after(330578, '1976-01-01');

select * from first_after(267);


http://localhost:3000/api/release_artists/335

http://localhost:3000/api/last_before/335

http://localhost:3000/api/first_after/335


    select c.*, rg.gid as release_group_gid
    from context.context as c
    join context.release_group as rg on rg.id = c.release_group
    where 
    c.artist like concat('%', 'trombone', '%')
     or c.title like concat('%', 'trombone', '%')
     or c.instrument like concat('%', 'trombone', '%')
    order by c.begin_date desc
    limit 100;