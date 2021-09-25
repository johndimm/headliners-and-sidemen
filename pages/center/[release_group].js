import { useRouter } from 'next/router'
import Center from 'components/Center'

export default function Index() {
  const router = useRouter()
  let { release_group } = router.query

  console.log('center page: release_group', release_group)
  //release_group = 335
  
  if (! release_group)
    return null

  return <div><Center release_group={release_group} /></div>
}