import Link from 'next/link'
import {useEffect, useState} from 'react'


const Artist =  ( { record, withpix, data_source } ) => {
  const [artist, setArtist] = useState('')
  
  const getArtistInfo = async () => {
    if (!withpix || data_source == 'musicbrainz') 
      return

    // const nconst = 'nm' + record['artist_id'].toString().padStart(7, '0')
    const nconst = record['artist_id']
    const url = `/api/artist_info/${nconst}`
    //console.log('getArtistInfo, url:', url)
    const results = await fetch(url)
    const data = await results.json()
    //console.log(data.results)
    setArtist(data.results)
  }

  useEffect ( () => {
    getArtistInfo()
  },[record])

  let pix
  if (withpix && artist && 'image_url' in artist && artist['image_url']) {
      const name = 'name' in artist
        ? artist['name'] 
        : ''

      pix = <img className='artist_pix' 
      onError={(e)=>{
        e.target.style.display='none'
        }}
      src={artist['image_url']} alt={name} />
  }
  
  const title = artist && 'partial_bio' in artist
    ? artist['partial_bio'] 
    : ''

  const link = `/artist_releases/${record.artist_id}`

  let begin_date
  if (record && 'begin_date' in record && record['begin_date']) 
    begin_date = record['begin_date'].replace('-01-01','')

  let age
  if (record && 'age' in record && record['age'] && record['age'] > 0)
    age = <span className='age'>({record['age']})</span>

    return <Link href={link} passHref={true}>
      <a title={title}>
      <div className='artist_info'>
          <div>{pix}</div>
          <div className='date'>{begin_date}</div>
          <div className='artist_name'>{record.artist} {age}</div>
          <div className='instrument'>{record.instrument}</div>

      </div>
      </a>
    </Link>
  }

  export default Artist