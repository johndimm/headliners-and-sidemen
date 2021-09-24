import ReleaseGroup from 'components/ReleaseGroup'
import Header from 'components/Header'

const ReleasesOverYears = ( {records} ) => {
    let years
    let headers 
    let cells
    if (records.length > 0) {
        years = {}
        headers = []
        records.forEach ( (record, idx) => {
            const year = record.begin_date.substring(0, 4)
            if (! (year in years)) {
                years[year] = []
                headers.push(<th>{year}</th>)
            }
            years[year].push(<ReleaseGroup key={idx} record={record} />)
        })

        cells = Object.keys(years).map ( (year, idx) => {
            return <td key={idx+1000}>{years[year]}</td>    
        })
    }

    return <div>
      <Header />
    <table>
        <thead><tr>{headers}</tr></thead>
        <tbody><tr>{cells}</tr></tbody>
    </table>
    </div>
}

export default ReleasesOverYears