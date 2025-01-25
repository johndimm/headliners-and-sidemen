import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Artist from 'components/Artist'
import CoverArt from 'components/CoverArt'

const categories = {
  'musicbrainz': 'album', 
  'imdb': 'movie', 
  'imdb_tv': 'tv show'
}

const youTube = (dataSource, imdbid, record) => {
  const youtube_logo = '/youtube.png'
  const date = record?.begin_date?.slice(0,4)
  const category = categories[dataSource]
  const query = encodeURIComponent(`${category} ${record.title} with ${record.artist} ${date} trailer`) 
  const youtube_url =  `https://www.youtube.com/results?search_query=${query}`
  return (

            <div>
         <a target='imdb' rel="noreferrer" href={youtube_url}>
           <img height='40' src={youtube_logo} alt=''/>
         </a>
       </div> 
  )
}

const externalLinks = (dataSource, imdbid, record) => {
  const youtube_logo = '/youtube.png'

  const date = record?.begin_date?.slice(0,4)

  const category = categories[dataSource]

  if (dataSource == 'musicbrainz') {
     const musicbrainz_url = `https://musicbrainz.org/release-group/${record.release_group}`
     const musicbrainz_logo = 'https://staticbrainz.org/MB/header-logo-1f7dc2a.svg'

     let queryRaw = `${category} ${record.title} ${date}`
     if (record.headliner != '')
       queryRaw += ` with ${record.headliner}`
     const query = encodeURIComponent(queryRaw)  
     const youtube_url =  `https://www.youtube.com/results?search_query=${query}`

     return <div className='external_links'>
       <div>
         <a target='musicbrainz' rel="noreferrer" href={youtube_url}>
           <img height='40' src={youtube_logo} alt='IMDb'/>
         </a>
       </div>

       <div>
         <a target='musicbrainz' rel="noreferrer" href={musicbrainz_url}>
           <img height='50' width='150' src={musicbrainz_logo} alt='IMDb'/>
         </a>
       </div>
  </div>
  }

  if (dataSource == 'imdb' || dataSource == 'imdb_tv') {
    const logo = 'https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png'
    const link = `https://www.imdb.com/title/${imdbid}`

    const query = encodeURIComponent(`${category} ${record.title} with ${record.artist} ${date} trailer`) 
    const youtube_url =  `https://www.youtube.com/results?search_query=${query}`

    const rtLogo = "https://www.rottentomatoes.com/assets/pizza-pie/images/rottentomatoes_logo_40.336d6fe66ff.png"
    const rtLink = `https://www.rottentomatoes.com/search?search=${query}`

    return <div className='external_links'>
        <div>
         <a target='imdb' rel="noreferrer" href={youtube_url}>
           <img height='40' src={youtube_logo} alt=''/>
         </a>
       </div>   

       <div>
         <a target='imdb' rel="noreferrer" href={rtLink}>
           <img height='50' src={rtLogo} alt=''/>
         </a>
       </div>  

      <div>
        <a target='imdb' rel="noreferrer" href={link}>
          <img height='50' src={logo} alt='IMDb'/>
        </a>
     </div>
    </div>
  }
 
}

function titleCase(str) {
  return str
      .split('_')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
}

const Center = ( {release_group, data_source, setReleaseGroup}) => {
    const [data, setData] = useState ([])
    const [album, setAlbum] = useState({})
    // console.log('data_source', data_source)

    // const imdbid = 'tt' + release_group.toString().padStart(7, '0')
    const imdbid = release_group

    useEffect( () => {
        const url = `/api/release_group/${release_group}`
        axios.get(url).then(function (response) {
            // console.log("Center, data", response.data)
            setData(response.data)
        }).catch(err => err)

        if (data_source == 'imdb' || data_source == 'imdb_tv') {
          const url = `/api/imdb/${imdbid}`
          axios.get(url).then(function (response) {
            // console.log("Center, data", response.data)
            const resultsField = data_source == 'imdb' 
              ? 'movie_results' 
              : 'tv_results'
            setAlbum(response.data[resultsField][0])
            // console.log('setAlbum:', response.data)
        }).catch(err => err)
      }

    },[release_group])


    let plot
    let details
    let title = data && data.length >= 1 ? data[0].title : ''
    if (album && Object.keys(album).length > 0) {
      title = album['title'] ? album['title'] : title

      if (album.overview != 'N/A')
        plot = album.overview
      
      const fields = ['original_language', 'original_title', 'release_date', 'popularity']
      //  ['Awards', 'Country', 'Director', 'Genre', 'Language', 'Rated', 'Writer', 'imdbRating']
        
        details = fields.map( (field, idx) => {
           if (album[field] == 'null')
             return null
           return <tr key={idx}><th>{titleCase(field)}</th><td>{album[field]}</td></tr>
        })

        console.log("album", album)

        //title = album['original_title']
        
        // console.log('details:', details)
    }

    let artists 
    let release
    let links
    let begin_date = '2200-01-01'
    if (Array.isArray(data) && data.length > 0) {
      // console.log('center', data[0])
      let coverArt = <CoverArt record={data[0]} data_source={data_source} size='big'/>

      artists = data.map( (record, idx) => {
        // console.log("artist", record.artist)
        if (record.begin_date < begin_date)
           begin_date = record.begin_date 
        return <Artist key={idx} record={record} withpix={true} data_source={data_source}/>
      })

      begin_date = begin_date.toString().replace('-01-01','')

      links = externalLinks(data_source, imdbid, data[0])
      let youtube = youTube(data_source, imdbid, data[0])

      release = <div>
          <div className='date'>{begin_date}</div>
          <div className='title'>{title}</div>
          <div className='headliner'>{data[0].headliner}</div>
          {coverArt}
          <div className='plot'>{plot}</div>
 
        </div>
    }

    return <div>
      {release}
      <div className='artists' style={{ columnCount: 2, paddingBottom: '50px', width: '75%', display: 'inline-block' }}>
      {artists}
      </div>
      <div className='details'><table><tbody>{details}</tbody></table></div>
      {links}
      </div>
}

export default Center