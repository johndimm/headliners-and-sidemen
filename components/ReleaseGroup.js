// import Link from 'next/link'
import CoverArt from 'components/CoverArt'
import Artist from 'components/Artist'

const ReleaseGroup = ({ record, data_source, artists, setReleaseGroup, callSetArtistId }) => {
	const link = `/release_group/${record.release_group}`
	const hlin = record.headliner ? <span> by {record.headliner}</span> : null

	if (!artists) artists = [record]

	let artistsHTML
	if (artists) {
		artistsHTML = artists.map((artist, idx) => {
			return <Artist key={idx} record={artist} withpix={false} data_source={data_source} callSetArtistId={callSetArtistId}/>
		})
	}

	let begin_date
	if (record && 'begin_date' in record && record['begin_date'])
		begin_date = record['begin_date'].replace('-01-01', '')

	const rankHtml = record.rank ? "#" + record.rank : ''
	return (
		<div className='linked_album'>
			<div
				className='album_title'
				onClick={() => {
					if (setReleaseGroup) {
						setReleaseGroup(record.release_group)
					} else {
						window.location.href = `/release_group/${record.release_group}`
					}
				}}
			>
				<b>{record.title}</b> {hlin}
				<div className='date'>{begin_date}</div>
				<CoverArt record={record} data_source={data_source} size='small' />
			</div>

			{artistsHTML}
		</div>
	)
}

export default ReleaseGroup
