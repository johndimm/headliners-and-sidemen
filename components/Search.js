import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleasesOverYears from 'components/ReleasesOverYears'
import dups from 'utils/dups'

const Search = ( {query} ) => {
    const [records, setRecords] = useState([])
    const [source, setSource] = useState('')

    
    const setDataSource = async () => {
        const url = `/api/env/DATA_SOURCE`
        const response = await fetch(url)
        const data = await response.json()
        const data_source = data['DATA_SOURCE']
        setSource(data_source)
        console.log('set data_source:', data_source)
    }

    const search = async () => {
        const queryEsc = encodeURIComponent(query)
        const url = `/api/search/${queryEsc}`
        console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
        }).catch(err => err)
    }

    useEffect( () => {
        setDataSource()
        search()
    }, [query])

    return <ReleasesOverYears data_source={source} records={dups.removeDups(records)} />
}

export default Search