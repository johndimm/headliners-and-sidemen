import { useRouter } from 'next/router'
import FirstAfter from 'components/FirstAfter'

export default function Index() {
  const router = useRouter()
  const { release_group } = router.query

  console.log('last_before page: release_group', release_group)
  // release_group = 267
  
  if (! release_group)
    return null

  return <div><FirstAfter release_group={release_group} /></div>
}