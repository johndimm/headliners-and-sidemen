import CoverArt from 'components/CoverArt'
import Artist from 'components/Artist'

const CenterData = ( {records, callSetArtistId}) => {

    const data = records
    console.log('CenterData', data)
    let artists 
    let release
    let begin_date = '2200-01-01'
    let coverArt
    if (Array.isArray(data) && data.length > 0) {
      console.log(data[0], data[0].release_group_gid)
      coverArt = <CoverArt release_group_gid={data[0].release_group_gid} size='small' />
      artists = data.map( (record, idx) => {
        if (record.begin_date < begin_date)
           begin_date = record.begin_date 
        return <Artist key={idx} record={record} callSetArtistId={callSetArtistId}/>
      })

      release = <div>
          <div className='date'>{begin_date.toString()}</div>
          <div className='title'>{data[0].title}</div>
          <div className='headliner'>{data[0].headliner}</div>
          {coverArt}
        </div>
    }

    return <div>{release}{artists}</div>
}

export default CenterData