import { useRouter } from 'next/router'
import LastBefore from 'components/LastBefore'

export default function Index() {
  const router = useRouter()
  const { release_group } = router.query

  console.log('last_before page: release_group', release_group)
  
  if (! release_group)
    return null

  return <div><LastBefore release_group={release_group} /></div>
}