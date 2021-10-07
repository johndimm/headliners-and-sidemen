import ReleaseGroup from 'components/ReleaseGroup'
import Header from 'components/Header'

const ReleasesOverYears = ( {records, data_source} ) => {
    let headers = []
    let cells = []
    if (records.length > 0) {
        console.log("ReleasesOverYears num records:", records.length)
        let years = {}
        if (records && Array.isArray(records))
        records.forEach ( (record, idx) => {
            let year
            if ('begin_date' in record && record.begin_date && record.begin_date != '') {
                //console.log('ReleasesOverYears, begin_date:', record.begin_date)
                year = record.begin_date.substring(0,4)
            } else {
                year = 1900
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

    return <div>
        <Header data_source={data_source} />
        <table>
            <thead><tr>{headers}</tr></thead>
            <tbody><tr>{cells}</tr></tbody>
        </table>
    </div>
}

export default ReleasesOverYears