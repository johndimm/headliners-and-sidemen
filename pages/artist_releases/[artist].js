import { useRouter } from 'next/router'
import ArtistReleases from 'components/ArtistReleases'
import Header from 'components/Header'

export default function Index() {
  const router = useRouter()
  const { artist } = router.query
  
  if (! artist)
    return null

  return <ArtistReleases artist_id={artist} />
}
