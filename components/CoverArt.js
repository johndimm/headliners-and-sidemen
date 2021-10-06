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

  useEffect( () => {
    if (data_source == 'imdb' || data_source == 'imdb_tv')
    axios.request(options).then(function (response) {
      // console.log('IMDbImage:', response.data);
      const poster_url = response.data
      if (poster_url != 'N/A')
        setData(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  },[imdbid])


  const imdbid = 'tt' + record.release_group.toString().padStart(7, '0')

  if (record.cover_url) {
    const bigCover = record.cover_url.replace('250.jpg', '500.jpg')
    const link = generateExternalLink(data_source, imdbid, record.title, record.artist)
    return <a target='imdb' rel="noreferrer" 
      href={link}><img src={bigCover} alt='Cover Art' /></a>
  }

  var options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {r: 'json', i: imdbid},
    headers: {
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
      'x-rapidapi-key': '7c50e30be4msh46ea378278c3277p1a0889jsnadf4767451d5'
    }
  };



  const updateDatabase = (imdbid, cover_url) => {
    if (cover_url === 'N/A' || cover_url === 'N')
      return
    const cover_url_esc = encodeURIComponent(cover_url)
    const fetchUrl = `/api/cover_art/update/${imdbid}/${cover_url_esc}`
    // console.log('fetchUrl', fetchUrl)
    fetch(fetchUrl)
  }

  let image
  if (data && 'Poster' in data && 
  ( data.Poster !== 'N/A' && data.Poster !== 'N' ) ) {
    // console.log('data.Poster:', data.Poster)
    image =  <img src={data.Poster} alt='cover_art' 
      onLoad={updateDatabase(imdbid, data.Poster)} />
  }

  const link = generateExternalLink('imdb', imdbid, null, null)
  return <div><a target='imdb' rel="noreferrer" href={link}>{image}</a></div>
}

export default CoverArt
