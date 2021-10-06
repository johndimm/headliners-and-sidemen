import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleaseGroup from 'components/ReleaseGroup'
import dups from 'utils/dups'

const FirstAfter = ( {release_group, data_source} ) => {
    const [records, setRecords] = useState([])

    useEffect( () => {
        document.body.style.cursor = 'progress' 
        const url = `/api/first_after/${release_group}`
        // console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
            document.body.style.cursor = 'default' 
        }).catch(err => err)
    }, [release_group])

    let html 
    if (records.length > 0)
      html = dups.removeDups(records).map ( (record, idx) => {
        return <ReleaseGroup key={idx} record={record} data_source={data_source}/>
    })

    return <div>{html}</div>
}

export default FirstAfter