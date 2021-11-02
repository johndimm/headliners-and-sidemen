import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Artist from 'components/Artist'
import CoverArt from 'components/CoverArt'

const externalLinks = (dataSource, imdbid, record) => {
  const query = encodeURIComponent (`"${record.title}" OR "${record.headliner}"`)


  if (dataSource == 'musicbrainz') {
     const youtube_url =  `https://www.youtube.com/results?search_query=${query}`
     const youtube_logo = '/youtube.png'
     const musicbrainz_url = `https://musicbrainz.org/release-group/${record.release_group}`
     const musicbrainz_logo = 'https://staticbrainz.org/MB/header-logo-1f7dc2a.svg'
     return <div>
       <div>
         <a target='imdb' rel="noreferrer" href={youtube_url}>
           <img height='75' src={youtube_logo} alt='IMDb'/>
         </a>
       </div>

       <div>
         <a target='imdb' rel="noreferrer" href={musicbrainz_url}>
           <img max-height='50' max-width='150' src={musicbrainz_logo} alt='IMDb'/>
         </a>
       </div>
  </div>
  }

  if (dataSource == 'imdb' || dataSource == 'imdb_tv') {
    const logo = 'https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png'
    const link = `https://www.imdb.com/title/${imdbid}`
    return <div>
        <a target='imdb' rel="noreferrer" href={link}>
        <img height='50' src={logo} alt='IMDb'/>
      </a>
  </div>
  }
 
}

const Center = ( {release_group, data_source}) => {
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
            setAlbum(response.data)
            // console.log('setAlbum:', response.data)
        }).catch(err => err)
      }

    },[release_group])


    let plot
    let details
    if (Object.keys(album).length > 0) {
      if (album.Plot != 'N/A')
        plot = album.Plot
      
      const fields = 
        ['Awards', 'Country', 'Director', 'Genre', 'Language', 'Rated', 'Writer', 'imdbRating']
        
        details = fields.map( (field, idx) => {
           if (album[field] == 'N/A')
             return null
           return <tr key={idx}><th>{field}</th><td>{album[field]}</td></tr>
        })
        
        // console.log('details:', details)
    }

    let artists 
    let release
    let links
    let begin_date = '2200-01-01'
    if (Array.isArray(data) && data.length > 0) {
      // console.log('center', data[0])
      let coverArt = <CoverArt record={data[0]} data_source={data_source} />

      artists = data.map( (record, idx) => {
        if (record.begin_date < begin_date)
           begin_date = record.begin_date 
        return <Artist key={idx} record={record} withpix={true} data_source={data_source}/>
      })

      begin_date = begin_date.toString().replace('-01-01','')

      links = externalLinks(data_source, imdbid, data[0])

      release = <div>
          <div className='date'>{begin_date}</div>
          <div className='title'>{data[0].title}</div>
          <div className='headliner'>{data[0].headliner}</div>
          {coverArt}
          <div className='plot'>{plot}</div>
 
        </div>
    }

    return <div>

      {release}
      <div className='artists'>
      {artists}
      </div>
      {links}
      <div className='details'><table><tbody>{details}</tbody></table></div>
      </div>
}

export default Center