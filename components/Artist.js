import Link from 'next/link'
import {useEffect, useState} from 'react'
import CoverArt from 'components/CoverArt'


const Artist =  ( { record, withpix, data_source } ) => {
  const [artist, setArtist] = useState({})
  
  useEffect ( () => {

    const getArtistInfo = async () => {
      if (!withpix || data_source == 'musicbrainz') 
        return

      // const nconst = 'nm' + record['artist_id'].toString().padStart(7, '0')
      const nconst = record['artist_id']
      const artist_seq = record['artist_seq']
      const url = `/api/artist_info/${nconst}/${artist_seq}`
      // const url = `/api/artist_info/${nconst}/${artist_seq}`

      console.log('getArtistInfo, url:', url)
      const results = await fetch(url)
      const data = await results.json()
      console.log('getArtistInfo', data.results)
      setArtist(data.results)
    }

    getArtistInfo()
      .catch(console.error);
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

  //            <div className='date'>{begin_date}</div>

  const getBefore = (side) => {
    if (artist[side] && artist[side].length > 0) {
      return artist[side][0]
    }
    else {
      return null
    }
  }
    const before = getBefore("before")
    const after = getBefore("after")
    const before_img = before ? before["cover_url"] : ''
    const after_img = after ? after["cover_url"] : ''
    const before_title = before ? before['title'] : ''
    const after_title = after ? after['title'] : ''

    const beforeCover = before 
      ? <CoverArt record={before} data_source={data_source} size='small'/>
      : null
    
    const afterCover = after 
      ? <CoverArt record={after} data_source={data_source} size='small'/>
      : null

    console.log("before_img", before_img)
    console.log("after_img", after_img)

    return <div>

      <div className='artist_info'>
        <div style={{whiteSpace:'nowrap'}}>
          {beforeCover}
          {pix}
          {afterCover}
        </div>

          <Link href={link} passHref={true}>
            <a title={title}>

                <div className='artist_name'>{record.artist} {age}</div>
                <div className='instrument'>{record.instrument}</div>
            </a>
          </Link>
        </div>
      </div>
  }

  export default Artist