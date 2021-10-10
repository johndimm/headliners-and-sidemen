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
    const [album, setAlbum] = useState({})
    // console.log('data_source', data_source)

    const imdbid = 'tt' + release_group.toString().padStart(7, '0')

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
    let external_links
    let begin_date = '2200-01-01'
    if (Array.isArray(data) && data.length > 0) {
      let coverArt = <CoverArt record={data[0]} />

      artists = data.map( (record, idx) => {
        if (record.begin_date < begin_date)
           begin_date = record.begin_date 
        return <Artist key={idx} record={record} withpix={true} data_source={data_source}/>
      })

      begin_date = begin_date.toString().replace('-01-01','')


      const link = generateExternalLink(data_source, imdbid, data[0].title, data[0].artist)
      const logo = data_source == 'musicbrainz'
        ? '/youtube.png'
        : 'https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png'

      external_links = <div>
        <a target='imdb' rel="noreferrer" 
        href={link}>
          <img height='50' src={logo} target='_blank' alt='IMDb'/>
        </a>
      </div>

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
      {external_links}
      <div className='details'><table><tbody>{details}</tbody></table></div>
      </div>
}

export default Center