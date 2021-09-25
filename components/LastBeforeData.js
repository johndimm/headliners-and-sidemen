import ReleaseGroup from 'components/ReleaseGroup'

const LastBeforeData = ( {records} ) => {
    console.log('LastBeforeData', records)
    let html
    if (Array.isArray(records) && records.length > 0) 
      html = records.map ( (record, idx) => {
        return <ReleaseGroup key={idx} record={record} />
      })

    return <div>{html}</div>
}

export default LastBeforeData