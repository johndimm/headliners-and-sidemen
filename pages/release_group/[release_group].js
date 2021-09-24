import { useRouter } from 'next/router'
import FirstAfter from 'components/FirstAfter'
import LastBefore from 'components/LastBefore'
import Center from 'components/Center'
import Header from 'components/Header'
import Init from 'components/CoverArt'

export default function Index() {
  const router = useRouter()
  const { release_group } = router.query
  
  console.log('release-group page, release_group:', release_group)

  if (! release_group)
    return null

  return <div>
    <Header />
    <table>
    <tbody><tr>
      <td>
        <LastBefore release_group={release_group} />
      </td>
      <td className='middle'>
        <Center release_group={release_group} />
      </td>
      <td>
        <FirstAfter release_group={release_group} />     
      </td>
    </tr></tbody>
  </table> 
  </div> 
}
