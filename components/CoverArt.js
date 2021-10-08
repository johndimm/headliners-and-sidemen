import React, {useState, useEffect} from 'react'
import axios from 'axios'

const generateExternalLink = (dataSource, imdbid, title, artist) => {
  const query = encodeURIComponent (title + ', ' + artist)
  const link = dataSource == 'imdb' || dataSource == 'imdb_tv'
    ? `https://www.imdb.com/title/${imdbid}`
    : `https://www.youtube.com/results?search_query=${query}`
  return link  
}

const CoverArt = ( {record, data_source} ) => {
  const [data, setData] = useState({})

  const imdbid = 'tt' + record.release_group.toString().padStart(7, '0')

  const getPoster = async (imdbid) => {
     const endpoint = `/api/imdb/${imdbid}`
     const response = await fetch(endpoint)
     const data = await response.json()
     const poster_url = data.Poster
     if (poster_url != 'N/A' && poster_url != 'N')
       setData(data)
  }

  const updateDatabase = (imdbid, cover_url) => {
    if (cover_url === 'N/A' || cover_url === 'N')
      return
    const cover_url_esc = encodeURIComponent(cover_url)
    const fetchUrl = `/api/cover_art/update/${imdbid}/${cover_url_esc}`
    fetch(fetchUrl)
  }

  useEffect( () => {
    if ( ! (data_source == 'imdb' || data_source == 'imdb_tv') )
      return
    
    if ( record.cover_url
         && ( record.cover_url.substring(0,4) == 'http' )
       ) 
      return

      getPoster(imdbid)
  },[imdbid])


  if (record.cover_url) {
    const bigCover = record.cover_url.replace('250.jpg', '500.jpg')
    const link = generateExternalLink(data_source, imdbid, record.title, record.artist)
    return <a target='imdb' rel="noreferrer" 
      href={link}><img src={bigCover} alt='Cover Art' /></a>
  }

  let image
  if (data 
    && 'Poster' in data 
    && ( data.Poster !== 'N/A' && data.Poster !== 'N' ) ) {
    image =  <img src={data.Poster} alt='cover_art' 
      onLoad={updateDatabase(imdbid, data.Poster)} />
  }

  const link = generateExternalLink('imdb', imdbid, null, null)
  return <div><a target='imdb' rel="noreferrer" href={link}>{image}</a></div>
}

export default CoverArt
