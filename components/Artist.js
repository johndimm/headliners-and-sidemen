import Link from 'next/link'

const Artist =  ( { record } ) => {
  const link = `/artist_releases/${record.artist_id}`
  let begin_date
  if (record && 'begin_date' in record && record['begin_date']) 
    begin_date = record['begin_date'].replace('-01-01','')

    return <Link href={link} passHref={true}>
      <div className='artist_info'>
          <div className='date'>{begin_date}</div>
          <div className='artist'>{record.artist}</div>
          <div className='instrument'>{record.instrument}</div>
      </div>
    </Link>
  }

  export default Artist