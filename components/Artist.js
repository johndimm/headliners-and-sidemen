import Link from 'next/link'
import {useEffect, useState} from 'react'


const Artist =  ( { record, withpix, data_source } ) => {
  const [artist, setArtist] = useState('')
  
  const getArtistInfo = async () => {
    if (data_source == 'musicbrainz') 
      return

    const nconst = 'nm' + record['artist_id'].toString().padStart(7, '0')
    const url = `/api/artist_info/${nconst}`
    // console.log('getArtistInfo, url:', url)
    const results = await fetch(url)
    const data = await results.json()
    console.log(data.ActorDetails)
    setArtist(data.ActorDetails)
  }

  useEffect ( () => {
    getArtistInfo()
  },[record])

  let pix
  if (withpix && artist && 'image_url' in artist) 
      pix = <img className='artist_pix' 
      onError={(e)=>{
        e.target.style.display='none'
        }}
      src={artist['image_url']} alt={artist['partial_bio']} />
  

  const link = `/artist_releases/${record.artist_id}`
  let begin_date
  if (record && 'begin_date' in record && record['begin_date']) 
    begin_date = record['begin_date'].replace('-01-01','')

    return <Link href={link} passHref={true}>
      <a title={artist['partial_bio']}>
      <div className='artist_info'>
          <div>{pix}</div>
          <div className='date'>{begin_date}</div>
          <div className='artist_name'>{record.artist}</div>
          <div className='instrument'>{record.instrument}</div>

      </div>
      </a>
    </Link>
  }

  export default Artist