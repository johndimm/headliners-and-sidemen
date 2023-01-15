import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleaseGroup from 'components/ReleaseGroup'
// import dups from 'utils/dups'

const Sidebar = ( {release_group, data_source, before_after} ) => {
    const [records, setRecords] = useState([])

    useEffect( () => {
        document.body.style.cursor = 'progress' 
        const url = `/api/${before_after}/${release_group}`
        // console.log(url)
        axios.get(url).then(function (response) {
            if (response.data)
              setRecords(response.data)
            document.body.style.cursor = 'default' 
        }).catch(err => err)
    }, [release_group])


    let html
    if (records.length > 0 && Array.isArray(records)) {
      let releases = {}

      records.forEach( (record, idx) => {
        if  (! (record.release_group in releases)) {
          releases[record.release_group] = []
        }
        releases[record.release_group].push(record)
      })

      // console.log('releases', releases)

      html = Object.keys(releases).map ( (release_group, idx) => {
        const record = releases[release_group][0]
        const artists = releases[release_group]
        return <ReleaseGroup 
          key={idx} 
          record={record} 
          data_source={data_source} 
          artists={artists} />
      })
    }

    return <div>{html}</div>
}

export default Sidebar