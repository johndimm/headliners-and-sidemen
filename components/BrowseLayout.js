import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FirstAfter from 'components/FirstAfter'
import LastBefore from 'components/LastBefore'
import Center from 'components/Center'
import Header from 'components/Header'

// const Index = () => {
export default function BrowseLayout( { release_group }) {
  const [dataSource, setDataSource] = React.useState('')

  useEffect( () => {
    const url = `/api/env/DATA_SOURCE/`
    axios.get(url).then(function (response) {
        const data_source = response.data['DATA_SOURCE']
        if (data_source)
          setDataSource(data_source)
    }).catch(err => err)
  }, [])
  

  if (!dataSource)
    return null

  if (!release_group) {
    const startingPoints = {'musicbrainz': 38581, 'imdb': 133093, 'imdb_tv': 141842}
    release_group = startingPoints[dataSource]
    if (!release_group)
      return null
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
