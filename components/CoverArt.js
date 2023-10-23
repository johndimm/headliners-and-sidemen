import React, { useState, useEffect } from 'react'
// import axios from 'axios'

let imgList = {}

const CoverArt = ({ record, data_source, size }) => {
	const [data, setData] = useState({})
	const imdbid = record.release_group

	const getPoster = async (imdbid) => {
		//   if (imgList[imdbid] == 1) {
		//     console.log('should already have the poster for ', imdbid)
		//   } else {
		//     console.log('new image for  ', imdbid)
		//   }

		imgList[imdbid] = 1

		const endpoint = `/api/imdb/${imdbid}`
		const response = await fetch(endpoint)
		const data = await response.json()

		const resultsField = data_source == 'imdb' ? 'movie_results' : 'tv_results'
		const results = data[resultsField][0]
		if (!results) return

		const poster_path = results['poster_path']
		if (!poster_path) return
		const width = size == 'small' ? 'w200' : 'w500'
		results['Poster'] = `https://image.tmdb.org/t/p/${width}/${poster_path}`
		// console.log('imdb results:', results)
		setData(results)
	}

	const updateDatabase = (imdbid, cover_url) => {
		if (cover_url === 'N/A' || cover_url === 'N') return
		if (!('Poster' in data)) return

		console.log('updateDatabase, imdbid, cover_url', imdbid, cover_url)

		const postdata = {
			imdbid: imdbid.replace('tt', ''),
			cover_url: cover_url
		}

		fetch('/api/cover_art/update', {
			method: 'POST',
			body: JSON.stringify(postdata)
		})
	}

	const imageSized = (cover_url, size) => {
		// return cover_url
		if (size === 'big') {
			return cover_url
				.replace('250.jpg', '500.jpg')
				.replace('w200', 'w500')
				.replace('SX300', 'SX600')
		}
		if (size === 'small') {
			return cover_url
				.replace('500.jpg', '250.jpg')
				.replace('w500', 'w200')
				.replace('SX300', 'SX200')
		}
	}

	useEffect(() => {
		if (!(data_source == 'imdb' || data_source == 'imdb_tv')) return

		if (
			record.cover_url &&
			(record.cover_url.substring(0, 4) == 'http' || record.cover_url == 'N/A')
		) {
			return
		}

		// Request info about this title from the omdb API.
		setTimeout(() => getPoster(imdbid), Math.random() * 100)
	}, [imdbid])

	if (record.cover_url && record.cover_url != 'N/A') {
		const bigCover = imageSized(record.cover_url, size)

		return (
			<img
			    className='center_img'
				id={record.release_group}
				data={bigCover}
				src={bigCover}
				type='image/jpeg'
				alt={record.release_group}
				onError={(e) => {
					console.log('cover image error', bigCover)
					e.target.style.display = 'none'
				}}
				onLoad={(e) => {
					//console.log('cover image loaded!', bigCover)
					e.target.style.display = 'block'
				}}
			/>
		)
	} else {
		//console.log('no cover_url in record:', record)
	}

	let image
	if (data && 'Poster' in data && data.Poster !== 'N/A' && data.Poster !== 'N') {
		// console.log('Cover Art using downloaded image, data.Poster', data.Poster)

		// Displaying an image downloaded from the omdb API.
		const coverImg = imageSized(data.Poster, size)
		image = (
			<img
				src={coverImg}
				alt='cover_art'
				onError={(e) => {
					console.log('poster image error', coverImg, e)
					e.target.style.display = 'none'
				}}
				onLoad={(e) => {
					//console.log('poster image loaded!', coverImg, e)
					updateDatabase(imdbid, coverImg)
					e.target.style.display = 'block'
				}}
			/>
		)
	} else {
		image = <div style={{ height: '10px' }}></div>
	}

	// console.log('image:', image)

	return <div>{image}</div>
}

export default CoverArt
