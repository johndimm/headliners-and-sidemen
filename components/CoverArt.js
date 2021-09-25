import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import axios from 'axios'

const CoverArt = ( {release_group_gid} ) => {
  const [coverArt, setCoverArt] = useState('')

  useEffect ( () => {
    const url = `https://coverartarchive.org/release-group/${release_group_gid}?fmt=json`
    setCoverArt('')
    axios.get(url).then(function (response) {
      // console.log('CoverArt:', response.data)
      const src = response.data.images[0].thumbnails['small']
      setCoverArt(src)
    }).catch(err => { setCoverArt('') })

  },[release_group_gid] )

  if (! coverArt)
    return null

  return <Image src={coverArt} alt={release_group_gid} />
}

export default CoverArt
