    select *
    from context
    where context.artist_id = 'nm0290047'
    and context.artist_seq < 1
    order by context.artist_seq desc
    limit 1
