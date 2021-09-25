import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleasesOverYears from 'components/ReleasesOverYears'

const ArtistReleases = ( {artist_id} ) => {
    const [records, setRecords] = useState([])

    useEffect( () => {
        document.body.style.cursor = 'progress' 
        const url = `/api/artist_releases/${artist_id}`
        console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
            document.body.style.cursor = 'default'
        }).catch(err => err)
    }, [artist_id])

    return <ReleasesOverYears records={records} />
}

export default ArtistReleases