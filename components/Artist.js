import Link from 'next/link'

const Artist =  ( { record } ) => {
  const link = `/artist_releases/${record.artist_id}`
    return <Link href={link}>
      <div>
          <div className='date'>{record.begin_date}</div>
          <div className='artist'>{record.artist}</div>
          <div className='instrument'>{record.instrument}</div>
      </div>
    </Link>
  }

  export default Artist