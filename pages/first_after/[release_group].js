import { useRouter } from 'next/router'
import Sidebar from 'components/Sidebar'

export default function Index() {
  const router = useRouter()
  const { release_group } = router.query

  // console.log('first_after page: release_group', release_group)
  // release_group = 267
  
  if (! release_group)
    return null

  return <div><Sidebar before_after='first_after' release_group={release_group} /></div>
}