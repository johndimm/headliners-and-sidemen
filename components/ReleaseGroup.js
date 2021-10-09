import Link from 'next/link'
import CoverArt from 'components/CoverArt'
import Artist from 'components/Artist'

const ReleaseGroup = ( {record, data_source}) => {
    const link = `/release_group/${record.release_group}`
    const hlin = record.headliner
      ? <span> by {record.headliner}</span>
      : null

    return <div className='linked_album'>
          <Link href={link} passHref={true}>
              <div className="album_title">
                <b>{record.title}</b> {hlin}
                <CoverArt record={record} data_source={data_source}/>
              </div>
          </Link>
          <Artist record={record} withpix={false} data_source={data_source}/>
        </div>
}

export default ReleaseGroup