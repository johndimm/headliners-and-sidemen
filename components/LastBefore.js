import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleaseGroup from 'components/ReleaseGroup'

const LastBefore = ( {release_group} ) => {
    const [records, setRecords] = useState([])

    useEffect( () => {
        const url = `/api/last_before/${release_group}`
        console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
        }).catch(err => err)
    }, [release_group])

    let html
    if (records.length > 0) 
      html = records.map ( (record, idx) => {
        return <ReleaseGroup key={idx} record={record} />
      })

    return <div>{html}</div>
}

export default LastBefore