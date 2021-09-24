import Link from 'next/link'
import CoverArt from 'components/CoverArt'
import Artist from 'components/Artist'

const ReleaseGroup = ( {record}) => {
    const link = `/release_group/${record.release_group}`

    return <div className='linked_album'>
          <Link href={link}>
              <div>
                <b>{record.title}</b> by {record.headliner}
                <CoverArt release_group_gid={record.release_group_gid} />
              </div>
          </Link>
          <Artist record={record} />
        </div>
}

export default ReleaseGroup