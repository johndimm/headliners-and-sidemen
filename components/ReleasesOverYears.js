import ReleaseGroup from 'components/ReleaseGroup'
import Header from 'components/Header'
import { useState } from 'react'

function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }
  

const CareerMap = ( {years, zoomIn, zoomOut} ) => {
    let minDate = 2100 
    let maxDate = 1900

    Object.keys(years).map( (year, idx) => {
       minDate = Math.min(minDate, year)
       if (year < 2100)
         maxDate = Math.max(maxDate, year)
    })

    for (let date=minDate; date<=maxDate; date++) {
        if (! (date in years)) {
            years[date] = []
        }
    }

    let maxYear = 0
    for (let year in years) {
       const nYear = years[year].length
       maxYear = Math.max(maxYear, nYear)
    }

    const map = Object.keys(years).map( (year, idx) => {
       const height = years[year].length * (10 / (0.4 * maxYear))
       const style = { height: height }
       return (
           <td key={idx}>
               <a title={year} href={`#${year}`}>
               <div className='career_map_bar' style={style} ></div>
               </a>
            </td>
       )
   })

   let endDate
   if (maxDate != 1900) {
       endDate =  <span className='max_date' style={{float:"right"}}>{maxDate}</span>
   }

   return <div className='career_map'>

        <table className='career_map_table'>
                <thead></thead>
                <tbody><tr>{map}</tr></tbody>
        </table>
        <span className='min_date'>{minDate}</span>
        <button onClick={zoomOut}>-</button>
        zoom
        <button onClick={zoomIn}>+</button>
        {endDate}
   </div>

}

const ReleasesOverYears = ( {records, data_source, artist, query} ) => {
    const [zoom, setZoom] = useState(1)

    let headers = []
    let cells = []
    let years = {}

    let mouseX
    let mouseY
    let mouseDown = false

    const onMouseDown = (e) => {
        mouseDown = true
        mouseX = e.clientX
        mouseY = e.clientY
    }

    const onMouseUp = (e) => {
        mouseDown = false
    }

    const onMouseMove = (e) => {
        if (!mouseDown) return
        const newMouseX = e.clientX
        const newMouseY = e.clientY 
        if (mouseX != newMouseX || mouseY != newMouseY) {
            const dx = mouseX - newMouseX
            const dy = mouseY - newMouseY
            window.scrollBy(dx, dy)
            mouseX = newMouseX
            mouseY = newMouseY
        }
    }
    
    const zoomIn= (e) => {
        e.preventDefault()
        setZoom(zoom * 1.1)
    }

    const zoomOut= (e) =>{
        e.preventDefault()
        setZoom(zoom * 0.9)
    }

    if (records.length > 0) {
        let releases = {}

        records.forEach( (record, idx) => {
          if  (! (record.release_group in releases)) {
            releases[record.release_group] = []
          }
          releases[record.release_group].push(record)
        })

        if (records && Array.isArray(records))
        Object.keys(releases).forEach ( (release_group, idx) => {
            const record = releases[release_group][0]
            let year
            if ('begin_date' in record && record.begin_date && record.begin_date != '') {
                year = record.begin_date.substring(0,4)
            } else {
                year = 2100
            }

            if (! (year in years)) {
                years[year] = []
            }

            years[year].push(<ReleaseGroup 
              key={idx} 
              record={record} 
              data_source={data_source}
              artists={releases[release_group]} />)
        })

        Object.keys(years).sort(function(a, b){return a-b}).forEach ( (year, idx) => {
            headers.push(<th id={year} key={idx}>{year}</th>)  
            cells.push(<td key={idx}>{years[year]}</td>)
        })
    }

    let htmlArtist
    let htmlDetails
    if (records && records.length > 0 && artist && !('partial bio' in artist)) {
        let mbArtistLink
        const name = records[0].artist
        if (data_source == 'musicbrainz') {
            const id = records[0].artist_id
            //console.log('records[0]:', records[0])

            const musicbrainz_url = `https://musicbrainz.org/artist/${id}`
            const musicbrainz_logo = 'https://staticbrainz.org/MB/header-logo-1f7dc2a.svg'

            mbArtistLink =  <a target='musicbrainz' rel="noreferrer" href={musicbrainz_url}>
            <img height='70' width='150' src={musicbrainz_logo} alt='IMDb'/>
            </a>
        }

        htmlArtist = <div className='artist_featured'>
          <div className='artist_featured_name'>
              {name}
          </div>
          <CareerMap years={years} zoomIn={zoomIn} zoomOut={zoomOut}/>
          {mbArtistLink}
          </div>
    }

    if (artist && artist.image_url) {
        const fields = ['birth_date', 'birth_place']
        
        htmlDetails = fields.map( (field, idx) => {
           const niceField = titleCase(field.replace(/_/g, ' '))
           if (artist[field] == 'N/A')
             return null
           return <tr key={idx}><th>{niceField}</th><td>{artist[field]}</td></tr>
        })

        const logo = 'https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png'
        const link = `https://www.imdb.com/name/${artist.nconst}`

        htmlArtist = <div className='artist_featured'>
          <div className='artist_featured_name'>
              {artist.name}
          </div>
          <img className='artist_featured_pix' src={artist.image_url} alt={artist.name} />
          <CareerMap years={years} zoomIn={zoomIn} zoomOut={zoomOut}/>
          <div className='artist_featured_bio'>{artist.partial_bio}</div>

          <table><tbody className='bio_details'>{htmlDetails}</tbody></table>

          <div style={{width:"100%", textAlign:"center"}}>
            <a target='imdb' rel="noreferrer" href={link}>
               <img height='40' src={logo} alt='IMDb'/>
            </a>
          </div>
        </div>
        
    }

    const style = {zoom: zoom}
    return <div>
        <Header data_source={data_source} query={query}/>
        <div className="timeline" 
          onMouseMove={onMouseMove} 
          onMouseDown={onMouseDown} 
          onMouseUp={onMouseUp}>
            {htmlArtist}

            <table  style={style}>
                <thead><tr>{headers}</tr></thead>
                <tbody><tr>{cells}</tr></tbody>
            </table>

        </div>
    </div>
}

export default ReleasesOverYears