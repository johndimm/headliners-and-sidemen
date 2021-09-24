import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleasesOverYears from 'components/ReleasesOverYears'

const Search = ( {query} ) => {
    const [records, setRecords] = useState([])

    useEffect( () => {
        const url = `/api/search/${query}`
        console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
        }).catch(err => err)
    }, [query])

    return <ReleasesOverYears records={records} />
}

export default Search