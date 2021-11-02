import ReleaseGroup from 'components/ReleaseGroup'
import Header from 'components/Header'

const ReleasesOverYears = ( {records, data_source, artist, query} ) => {
    let headers = []
    let cells = []
    if (records.length > 0) {
        let releases = {}

        records.forEach( (record, idx) => {
          if  (! (record.release_group in releases)) {
            releases[record.release_group] = []
          }
          releases[record.release_group].push(record)
        })

        // console.log("ReleasesOverYears num records:", records.length)
        let years = {}
        if (records && Array.isArray(records))
        //records.forEach ( (record, idx) => {
        Object.keys(releases).forEach ( (release_group, idx) => {
            const record = releases[release_group][0]
            let year
            if ('begin_date' in record && record.begin_date && record.begin_date != '') {
                //console.log('ReleasesOverYears, begin_date:', record.begin_date)
                year = record.begin_date.substring(0,4)
            } else {
                year = 2100
            }

            if (! (year in years)) {
                years[year] = []
            }
            //if (record.cover_url != null)
            //  console.log('imdbid, cover_url:', record.release_group, record.cover_url)
            years[year].push(<ReleaseGroup 
              key={idx} 
              record={record} 
              data_source={data_source}
              artists={releases[release_group]} />)
        })

        Object.keys(years).sort(function(a, b){return a-b}).forEach ( (year, idx) => {
            headers.push(<th key={idx}>{year}</th>)  
            cells.push(<td key={idx}>{years[year]}</td>)
        })
    }

    let htmlArtist
    let htmlDetails
    if (artist && artist.partial_bio) {
        // console.log('artist', artist)

        const fields = 
        ['birth_date', 'birth_place']
        
        htmlDetails = fields.map( (field, idx) => {
           if (artist[field] == 'N/A')
             return null
           return <tr key={idx}><th>{field}</th><td>{artist[field]}</td></tr>
        })

        const logo = 'https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png'
        const link = `https://www.imdb.com/name/${artist.nconst}`

        htmlArtist = <div className='artist_featured'>
          <div className='artist_featured_name'>
              {artist.name}
          </div>
          <img className='artist_featured_pix' src={artist.image_url} />
          <div className='artist_featured_bio'>{artist.partial_bio}</div>
          <table><tbody>{htmlDetails}</tbody></table>
          <div style={{width:"100%", textAlign:"center"}}>
            <a target='imdb' rel="noreferrer" href={link}>
               <img height='40' src={logo} alt='IMDb'/>
            </a>
          </div>
        </div>
        
    }

    return <div>
        <Header data_source={data_source} query={query}/>
        <div className="content">
            {htmlArtist}
            <table className='timeline'>
                <thead><tr>{headers}</tr></thead>
                <tbody><tr>{cells}</tr></tbody>
            </table>
        </div>
    </div>
}

export default ReleasesOverYears