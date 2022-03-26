import React, {useState, useEffect} from 'react'
// import axios from 'axios'

let imgList = {}

const CoverArt = ( {record, data_source, size} ) => {
  const [data, setData] = useState({})

  // const imdbid = 'tt' + record.release_group.toString().padStart(7, '0')
  const imdbid = record.release_group

  const getPoster = async (imdbid) => {
     
  //   if (imgList[imdbid] == 1) {
  //     console.log('should already have the poster for ', imdbid)
  //   } else {
  //     console.log('new image for  ', imdbid)
  //   }

     imgList[imdbid] = 1

     const endpoint = `/api/imdb/${imdbid}`
     const response = await fetch(endpoint)
     const data = await response.json()

     const resultsField = data_source == 'imdb' 
       ? 'movie_results' 
       : 'tv_results'
     const results = data[resultsField][0]
     if (!results)
       return

     const poster_path = results['poster_path']
     if (!poster_path)
       return
     const width = size == 'small' ? 'w200' : 'w500'
     results['Poster'] = `https://image.tmdb.org/t/p/${width}/${poster_path}`
     // console.log('imdb results:', results)
     setData(results)
  }

  const updateDatabase = (imdbid, cover_url) => {
    if (cover_url === 'N/A' || cover_url === 'N')
      return
    if (!('Poster' in data))
      return

    console.log('updateDatabase, imdbid, cover_url', imdbid, cover_url)

    //const cover_url_esc = encodeURIComponent(cover_url)
    //const fetchUrl = `/api/cover_art/update/${imdbid}/${cover_url_esc}`
    //fetch(fetchUrl)
    const postdata = {
      imdbid: imdbid,
      cover_url: cover_url
    }

    fetch('/api/cover_art/update', {
      method: 'POST',
      body: JSON.stringify(postdata)
    })
  }

  useEffect( () => {
    if ( ! (data_source == 'imdb' || data_source == 'imdb_tv') )
      return
    
    // console.log('useEffect, imdbid, record.cover_url', imdbid, record.cover_url)
    if ( record.cover_url
         && ( record.cover_url.substring(0,4) == 'http' 
            || record.cover_url == 'N/A'
           )
       ) {
           // console.log('do not get poster for imdbid', imdbid)
           //if (record.cover_url == 'N/A')
           //  record.cover_url = ''
           return
       }

      setTimeout (() => getPoster(imdbid), Math.random() * 100)
  },[imdbid])


  if (record.cover_url && record.cover_url != 'N/A') {
    // console.log('CoverArt, record.cover', record.cover_url)
    let bigCover = record.cover_url.replace('250.jpg', '500.jpg')
    bigCover = bigCover.replace('w200', 'w500')
    // console.log('cover_url found!!!! :', bigCover, record)
    return <img src={bigCover} alt='Cover Art'
      onError={(e)=>{
        e.target.style.display='none'
        }}  />
  } else {
    //console.log('no cover_url in record:', record)
  }

  let image
  if (data 
    && 'Poster' in data 
    && ( data.Poster !== 'N/A' && data.Poster !== 'N' ) ) {
      // console.log('Cover Art using downloaded image, data.Poster', data.Poster)
      image = <img src={data.Poster} alt='cover_art' 
      onError={(e)=>{
        e.target.style.display='none'
        }} 
      onLoad={() => updateDatabase(imdbid, data.Poster)} />
  } else {
    image = <div style={{'height':'10px'}}></div>
  }

  // console.log('image:', image)

  return <div>{image}</div>
}

export default CoverArt
