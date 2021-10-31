import { useRouter } from 'next/router'
import Sidebar from 'components/Sidebar'

export default function Index() {
  const router = useRouter()
  const { release_group } = router.query

  console.log('last_before page: release_group', release_group)
  
  if (! release_group)
    return null

  return <div><Sidebar before_after='last_before' release_group={release_group} /></div>
}