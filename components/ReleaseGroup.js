import Link from 'next/link'
import CoverArt from 'components/CoverArt'
import Artist from 'components/Artist'

const ReleaseGroup = ( {record}) => {
    const link = `/release_group/${record.release_group}`
    const hlin = record.headliner
      ? <span> by {record.headliner}</span>
      : null

    return <div className='linked_album'>
          <Link href={link} passHref={true}>
              <div>
                <b>{record.title}</b> {hlin}
                <CoverArt cover_url={record.cover_url} />
              </div>
          </Link>
          <Artist record={record} />
        </div>
}

export default ReleaseGroup