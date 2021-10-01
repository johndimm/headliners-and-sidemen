import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleasesOverYears from 'components/ReleasesOverYears'
import dups from 'utils/dups'

const Search = ( {query} ) => {
    const [records, setRecords] = useState([])

    useEffect( () => {
        const queryEsc = encodeURIComponent(query)
        const url = `/api/search/${queryEsc}`
        console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
        }).catch(err => err)
    }, [query])

    return <ReleasesOverYears records={dups.removeDups(records)} />
}

export default Search