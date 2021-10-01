import { useRouter } from 'next/router'
import ReleaseGroupSet from 'components/oneGulp/ReleaseGroupSet'

export default function Index() {
  const router = useRouter()
  const { release_group } = router.query
  
  // console.log('release-group page, release_group:', release_group)

  if (! release_group)
    return null

  return <ReleaseGroupSet release_group={release_group} /> 
}
