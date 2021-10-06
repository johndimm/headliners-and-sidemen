import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Artist from 'components/Artist'
import CoverArt from 'components/CoverArt'

const generateExternalLink = (dataSource, imdbid, title, artist) => {
  const query = encodeURIComponent (title + ', ' + artist)
  const link = dataSource == 'imdb' || dataSource == 'imdb_tv'
    ? `https://www.imdb.com/title/${imdbid}`
    : `https://www.youtube.com/results?search_query=${query}`
  return link  
}

const Center = ( {release_group, data_source}) => {
    const [data, setData] = useState ([])
    // console.log('data_source', data_source)

    useEffect( () => {
        const url = `/api/release_group/${release_group}`
        axios.get(url).then(function (response) {
            // console.log("Center, data", response.data)
            setData(response.data)
        }).catch(err => err)
    },[release_group])

    let artists 
    let release
    let begin_date = '2200-01-01'
    if (Array.isArray(data) && data.length > 0) {
      let coverArt = <CoverArt record={data[0]} />

 /*     
      const imdbid = 'tt' + data[0].release_group.toString().padStart(7, '0')
      console.log('imdbid:', imdbid)
      if (data[0].cover_url) {
        const bigCover = data[0].cover_url.replace('250.jpg', '500.jpg')
        const link = generateExternalLink(data_source, imdbid, data[0].title, data[0].artist)
        coverArt = <a target='imdb' rel="noreferrer" href={link}><img src={bigCover} alt='Cover Art' /></a>
      } else if (data_source == 'imdb' || data_source == 'imdb_tv') {
        coverArt = <CoverArt imdbid={imdbid} />
      }
  */

      artists = data.map( (record, idx) => {
        if (record.begin_date < begin_date)
           begin_date = record.begin_date 
        return <Artist key={idx} record={record} />
      })

      begin_date = begin_date.toString().replace('-01-01','')

      release = <div>
          <div className='date'>{begin_date}</div>
          <div className='title'>{data[0].title}</div>
          <div className='headliner'>{data[0].headliner}</div>
          {coverArt}
        </div>
    }

    return <div>{release}{artists}</div>
}

export default Center