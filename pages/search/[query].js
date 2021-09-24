import { useRouter } from 'next/router'
import Search from 'components/Search'

export default function Index() {
  const router = useRouter()
  const { query } = router.query
  
  if (! query)
    return null

  return <div><Search query={query} /></div>
}