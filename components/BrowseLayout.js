import React, {useState, useEffect} from 'react'
import axios from 'axios'
//import FirstAfter from 'components/FirstAfter'
//import LastBefore from 'components/LastBefore'
import Sidebar from 'components/Sidebar'
import Center from 'components/Center'
import Header from 'components/Header'

// const Index = () => {
export default function BrowseLayout( { release_group, setReleaseGroup, callSetArtistId, noHeader }) {
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
       'musicbrainz': 'ef1afe99-b3d7-32a3-98f0-2e85cbc573e3', 
       'imdb': 'tt0084777', 
       'imdb_tv': 'tt7375404'
    }
    release_group = startingPoints[dataSource]
    if (!release_group)
      return null
  }

  const header = noHeader 
    ? <div></div>
    : <Header data_source={dataSource}/>

    return <div>
    {header}
    <div className="content">
      <table>
      <tbody><tr>
        <td>
          <Sidebar before_after='last_before' 
            setReleaseGroup={setReleaseGroup}
            callSetArtistId={callSetArtistId}
            release_group={release_group} data_source={dataSource}/>
        </td>
        <td className='center'> 
          <Center 
            setReleaseGroup={setReleaseGroup}
            callSetArtistId={callSetArtistId}
            release_group={release_group} data_source={dataSource}/>
        </td>
        <td>
          <Sidebar before_after='first_after' 
            setReleaseGroup={setReleaseGroup}
            callSetArtistId={callSetArtistId}
            release_group={release_group} data_source={dataSource}/>     
        </td>
      </tr></tbody>
    </table> 
  </div>
  </div> 
}
