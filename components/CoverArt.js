import React, { useState, useEffect } from 'react'

const CoverArt = ({ record, data_source, size }) => {
	const [image, setImage] = useState({
		url: null,
		source: ''
	})

	const log = (msg) => {
		console.log(`${msg} ${record.release_group} ${record['title']} ${record.cover_url} ${image.url}`)
	}

	const getPoster = async (imdbid) => {
		// log('downloading cover for')

		setImage({'url': null, 'source': 'initialize'})
		const url = `/api/imdb/${imdbid}`

		console.log("fetching poster: ", url)
		const response = await fetch(url)
		if (!response) {
			console.log('failed to fetch')
		}
		const data = await response.json()
		if (!data) {
			log("no data")
			return 
		}

		const resultsField = 'tv_results' in data 
		  && data['tv_results'].length > 0 
		  ? 'tv_results' 
		  : 'movie_results'

		const results = data[resultsField][0]
		if (!results) return

		const poster_path = results['poster_path'] 
		if (!poster_path) {
	        log ("Null poster_path")	
			return
		}

		const imgUrl = imageSized(`https://image.tmdb.org/t/p/w200/${poster_path}`, size)


		const img = { url: imgUrl, source: 'download' }
		setImage(img)

		console.log('download results:', results)
		console.log('image:', JSON.stringify(img))
	}

	const updateDatabase = (imdbid, cover_url) => {
        console.log(`updateDatabase, ${imdbid}, ${cover_url}`)

		const postdata = {
			imdbid: imdbid, // .replace('tt', ''),
			cover_url: cover_url
		}

		fetch('/api/cover_art/update', {
			method: 'POST',
			body: JSON.stringify(postdata)
		})
	}

	const imageSized = (cover_url, size) => {
		let url = ''
		if (size === 'big') {
			url = cover_url
				.replace('250.jpg', '500.jpg')
				.replace('w200', 'w500')
				.replace('SX300', 'SX600')
				.replace('SX200', 'SX600')
		}
		if (size === 'small') {
			url = cover_url
				.replace('500.jpg', '250.jpg')
				.replace('w500', 'w200')
				.replace('SX300', 'SX200')
				.replace('SX600', 'SX200')
		}

		return url
	}

	useEffect(() => {
		if (!(data_source == 'imdb' || data_source == 'imdb_tv')) {
			setImage( {url: record.cover_url, source: 'database'})
			return;
		}

		if (
			record.cover_url &&
			record.cover_url.substring(0, 4) == 'http' // || record.cover_url == 'N/A')
		) {
            // log('getting cover from database')
			setImage({ url: imageSized(record.cover_url, size), source: 'database' })
		} else {
			setTimeout(() => getPoster(record.release_group), Math.random() * 100)
		}
	}, [record])

	if (image.url == null || image.url == '') {
		// log('null image.url so return div')
		return <div style={{ height: '10px' }}></div>
	}
	// log('return an image')
	return (
		<img
			className='center_img'
			id={record.release_group}
			src={imageSized(image.url, size)}
			type='image/jpeg'
			alt={record.release_group}
			onError={(e) => {
				log('cover image load error for')
				e.target.style.display = 'none'
			}}
			onLoad={(e) => {
				// log('cover image loaded!')
				if (image.source == 'download') {
					updateDatabase(record.release_group, image.url)
				}
				// e.target.style.display = 'block'
			}}
		/>
	)
}

export default CoverArt
