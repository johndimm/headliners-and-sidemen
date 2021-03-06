import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReleasesOverYears from 'components/ReleasesOverYears'

const ArtistReleases = ( {artist_id} ) => {
    const [records, setRecords] = useState([])
    const [source, setSource] = useState('')
    const [artist, setArtist] = useState({})

    const setDataSource = async () => {
        const url = `/api/env/DATA_SOURCE`
        const response = await fetch(url)
        const data = await response.json()
        const data_source = data['DATA_SOURCE']
        setSource(data_source)
        //console.log('set data_source:', data_source)
    }

    const getReleases = async () => {
        const url = `/api/artist_releases/${artist_id}`
        // console.log(url)
        axios.get(url).then(function (response) {
            setRecords(response.data)
        }).catch(err => err)
    }

    const getArtistInfo = async () => {
        const nconst = artist_id
        const url = `/api/artist_info/${nconst}`
        const response = await fetch(url)
        const data = await response.json()
        data.results['nconst'] = nconst
        setArtist(data.results)
    }

    useEffect( () => {
        setDataSource()
        getReleases()
        getArtistInfo()
    }, [artist_id])

    return <div>
      <ReleasesOverYears 
        data_source={source} 
        records={records}
        artist={artist} />
    </div>
}

export default ArtistReleases