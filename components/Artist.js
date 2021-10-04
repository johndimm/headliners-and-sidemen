import Link from 'next/link'

const Artist =  ( { record } ) => {
  const link = `/artist_releases/${record.artist_id}`
  let date
  if (record && 'begin_date' in record && record['begin_date']) 
    date = record['begin_date'].replace('-01-01','')

    return <Link href={link} passHref={true}>
      <div className='artist_info'>
          <div className='date'>{date}</div>
          <div className='artist'>{record.artist}</div>
          <div className='instrument'>{record.instrument}</div>
      </div>
    </Link>
  }

  export default Artist