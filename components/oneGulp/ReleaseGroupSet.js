

import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from 'components/Header'
import FirstAfterData from 'components/FirstAfterData'
import LastBeforeData from 'components/LastBeforeData'
import CenterData from 'components/CenterData'

const ReleaseGroupSet = ( { release_group}) => {
    const [data, setData] = useState ({
        lastBefore: [],
        center: [],
        firstAfter: []
    })

    useEffect( () => {
        const url = `/api/release_group_set/${release_group}`
        axios.get(url).then(function (response) {
            console.log("ReleaseGroupSet, data", response.data)
            const bLastBefore = response.data.filter( record => record.page_section == 'last_before' )
            const bCenter = response.data.filter( record => record.page_section == 'center' )
            const bFirstAfter = response.data.filter( record  => record.page_section == 'first_after' )
            
            console.log("Center:", bCenter)

            setData({lastBefore: bLastBefore,
              center: bCenter,
              firstAfter: bFirstAfter})
        }).catch(err => err)
    },[release_group])

    if (data.center.length ==0)
      return null

    return <div className='release_group_set'>
        <div>
            <Header />
            <table>
            <tbody><tr>
            <td>
                <LastBeforeData records={data.lastBefore} />
            </td>
            <td className='center'>
                <CenterData records={data.center} />
            </td>
            <td>
                <FirstAfterData records={data.firstAfter} />     
            </td>
            </tr></tbody>
        </table> 
        </div> 
    </div>
}

export default ReleaseGroupSet