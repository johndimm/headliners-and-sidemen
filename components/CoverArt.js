import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CoverArt = ( {release_group_gid} ) => {
  const [coverArt, setCoverArt] = useState('')

  useEffect ( () => {
    const url = `http://coverartarchive.org/release-group/${release_group_gid}?fmt=json`
    setCoverArt('')
    axios.get(url).then(function (response) {
      // console.log('CoverArt:', response.data)
      const src = response.data.images[0].thumbnails['small']
      setCoverArt(src)
    }).catch(err => { setCoverArt('') })

  },[release_group_gid] )

  if (! coverArt)
    return null

  return <img src={coverArt} />
}

export default CoverArt
