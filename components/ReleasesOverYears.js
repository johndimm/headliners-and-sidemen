import ReleaseGroup from 'components/ReleaseGroup'
import Header from 'components/Header'

const ReleasesOverYears = ( {records} ) => {
    let years
    let headers 
    let cells
    if (records.length > 0) {
        years = {}
        headers = []
        if (records && Array.isArray(records))
        records.forEach ( (record, idx) => {
            const year = record.begin_date.substring(0, 4)
            // console.log('ReleasesOverYears:', year, record.title)
            if (! (year in years)) {
                years[year] = []
                headers.push(<th key={idx}>{year}</th>)
            }
            years[year].push(<ReleaseGroup key={idx} record={record} />)
        })

        cells = Object.keys(years).sort(function(a, b){return b-a}).map ( (year, idx) => {
            return <td key={idx}>{years[year]}</td>    
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