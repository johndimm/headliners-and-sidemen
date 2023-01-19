import { useRouter } from 'next/router'
import MovieTimeline from 'components/Sticky'

export default function Index() {
  const router = useRouter()
  let { release_group } = router.query
  if (!release_group)
    release_group = 'tt0084777'

  return <MovieTimeline release_group={release_group} />
}