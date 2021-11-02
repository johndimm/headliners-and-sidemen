import React, {useState, useEffect} from 'react'
import axios from 'axios'
//import FirstAfter from 'components/FirstAfter'
//import LastBefore from 'components/LastBefore'
import Sidebar from 'components/Sidebar'
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
    const startingPoints = {
       'musicbrainz': 'ab7dfb92-6c05-46b8-b8ae-ed4ee87b68c3', 
       'imdb': 'tt0108399', 
       'imdb_tv': 'tt7375404'
    }
    release_group = startingPoints[dataSource]
    if (!release_group)
      return null
  }

    return <div>
    <Header data_source={dataSource}/>
    <div className="content">
      <table>
      <tbody><tr>
        <td>
          <Sidebar before_after='last_before' 
            release_group={release_group} data_source={dataSource}/>
        </td>
        <td className='center'>
          <Center release_group={release_group} data_source={dataSource}/>
        </td>
        <td>
          <Sidebar before_after='first_after' 
            release_group={release_group} data_source={dataSource}/>     
        </td>
      </tr></tbody>
    </table> 
  </div>
  </div> 
}
