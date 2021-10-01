
import ReleaseGroup from 'components/ReleaseGroup'

const FirstAfterData = ( {records} ) => {
    console.log('FirstAfterData', records)
    let html 
    if (Array.isArray(records) && records.length > 0)
      html = records.map ( (record, idx) => {
        return <ReleaseGroup key={idx} record={record} />
    })

    return <div>{html}</div>
}

export default FirstAfterData