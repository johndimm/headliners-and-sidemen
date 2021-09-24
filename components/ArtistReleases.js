import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleasesOverYears from 'components/ReleasesOverYears'

const ArtistReleases = ( {artist_id} ) => {
    const [records, setRecords] = useState([])

    useEffect( () => {
        const url = `/api/artist_releases/${artist_id}`
        console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
        }).catch(err => err)
    }, [artist_id])

    return <ReleasesOverYears records={records} />
}

export default ArtistReleases