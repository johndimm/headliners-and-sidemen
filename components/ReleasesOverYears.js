import ReleaseGroup from 'components/ReleaseGroup'
import Header from 'components/Header'

const ReleasesOverYears = ( {records, data_source, artist} ) => {
    let headers = []
    let cells = []
    if (records.length > 0) {
        // console.log("ReleasesOverYears num records:", records.length)
        let years = {}
        if (records && Array.isArray(records))
        records.forEach ( (record, idx) => {
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
            years[year].push(<ReleaseGroup key={idx} record={record} data_source={data_source}/>)
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

        htmlArtist = <div className='artist_featured'>
          <div className='artist_featured_name'>
              {artist.name}
          </div>
          <img className='artist_featured_pix' src={artist.image_url} />
          <div className='artist_featured_bio'>{artist.partial_bio}</div>
          <table><tbody>{htmlDetails}</tbody></table>
        </div>
        
    }

    return <div>
        <Header data_source={data_source} />
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