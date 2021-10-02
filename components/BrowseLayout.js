import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import FirstAfter from 'components/FirstAfter'
import LastBefore from 'components/LastBefore'
import Center from 'components/Center'
import Header from 'components/Header'

// const Index = () => {
export default function BrowseLayout( { release_group }) {
  const [dataSource, setDataSource] = React.useState('musicbrainz')

  // const router = useRouter()
  // let { release_group } = router.query
  // const release_group=335

  useEffect( () => {
    const url = `/api/env/DATA_SOURCE/`
    // console.log(url)
    axios.get(url).then(function (response) {
        const data_source = response.data['DATA_SOURCE']
        // console.log('Got data_source:', data_source)
        if (data_source)
          setDataSource(data_source)
    }).catch(err => err)
  }, [])
  
  // console.log('release-group page, release_group:', release_group)

  if (!dataSource)
    return null

  if (!release_group) {
    if (dataSource == 'musicbrainz')
      release_group = 38581
    else if (dataSource == 'imdb')
      release_group = 133093
    console.log('BrowseLayout, release_group:', release_group)
  }

    return <div>
    <Header data_source={dataSource}/>
    <table>
    <tbody><tr>
      <td>
        <LastBefore release_group={release_group} />
      </td>
      <td className='center'>
        <Center release_group={release_group} data_source={dataSource}/>
      </td>
      <td>
        <FirstAfter release_group={release_group} />     
      </td>
    </tr></tbody>
  </table> 
  </div> 
}

// export default BrowseLayout