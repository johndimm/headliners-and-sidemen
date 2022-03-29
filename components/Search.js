import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleasesOverYears from 'components/ReleasesOverYears'
import dups from 'utils/dups'
import BrowseLayout from 'components/BrowseLayout'

const Search = ( {query} ) => {
    const [records, setRecords] = useState([])
    const [source, setSource] = useState('')

    const setDataSource = async () => {
        const url = `/api/env/DATA_SOURCE`
        const response = await fetch(url)
        const data = await response.json()
        const data_source = data['DATA_SOURCE']
        setSource(data_source)
        // console.log('set data_source:', data_source)
    }

    const doSearch = async () => {
        const querySQL = query.replace(/'/g, "''")
        const queryEsc = encodeURIComponent(querySQL)
        const url = `/api/search/${queryEsc}`
        // console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
        }).catch(err => err)
    }

    useEffect( () => {
        setDataSource()
        doSearch()
    }, [query])

    const distinctReleaseGroups = {}
    records.forEach( (r, idx) => {
       distinctReleaseGroups[r.release_group] = 1
    })

    if (Object.keys(distinctReleaseGroups).length === 1) {
        const release_group = Object.keys(distinctReleaseGroups)[0]
        // console.log('release group', release_group)
        return <div><BrowseLayout release_group={release_group} data_source={source}/></div>
    } else {
       return <ReleasesOverYears data_source={source} records={dups.removeDups(records)} query={query}/>
    }
}

export default Search