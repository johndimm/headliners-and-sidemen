import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import axios from 'axios'

let imgList = {}

const CoverArt = ({ record, data_source, size }) => {
	const [data, setData] = useState({})

	// const imdbid = 'tt' + record.release_group.toString().padStart(7, '0')
	const imdbid = record.release_group
	const pixelWidth = size == 'small' ? 200 : 500

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

		const width = `w${pixelWidth}`
		results['Poster'] = `https://image.tmdb.org/t/p/${width}/${poster_path}`
		// console.log('imdb results:', results)
		setData(results)
	}

	const updateDatabase = (imdbid, cover_url) => {
		if (cover_url === 'N/A' || cover_url === 'N') return
		if (!('Poster' in data)) return

		console.log('updateDatabase, imdbid, cover_url', imdbid, cover_url)

		//const cover_url_esc = encodeURIComponent(cover_url)
		//const fetchUrl = `/api/cover_art/update/${imdbid}/${cover_url_esc}`
		//fetch(fetchUrl)
		const postdata = {
			imdbid: imdbid,
			cover_url: cover_url
		}

		fetch('/api/cover_art/update', {
			method: 'POST',
			body: JSON.stringify(postdata)
		})
	}

	useEffect(() => {
		if (!(data_source == 'imdb' || data_source == 'imdb_tv')) return

		if (
			record.cover_url &&
			(record.cover_url.substring(0, 4) == 'http' || record.cover_url == 'N/A')
		) return
		
		setTimeout(() => getPoster(imdbid), Math.random() * 100)
	}, [imdbid])

	const printCover = (record) => {
		// console.log('CoverArt, record.cover', record.cover_url)
		if (record.cover_url != 'N/A') {
			let cover = record.cover_url
			if (size === 'big') {
				cover = cover.replace('250.jpg', '500.jpg').replace('w200', 'w500')
			}
			// console.log('cover_url found!!!! :', bigCover, record)
			const link = '/release_group/' + record.release_group
			return (
				<Link href={link} passHref={true}>
				<div style={{width:"110px", display:"inline-block"}}>
					<img
						className='artist_pix'
						src={cover}
						alt='Cover Art'
						onError={(e) => {
							e.target.style.display = 'none'
						}}
					/>
					<br/>
					{record.title}
				</div>
				</Link>
			)
		} else {
			return null
		}
	}

	const printPoster = (data) => {

		if (data.Poster === 'N/A' || data.Poster === 'N') {
			return <div style={{ height: '10px' }}></div>
		}

		const link = '/release_group/' + record.release_group
		return (
			<Link href={link} passHref={true}>
			<img
				className='artist_pix'
				src={data.Poster}
				alt='cover_art'
				onError={(e) => {
					e.target.style.display = 'none'
				}}
				onLoad={() => updateDatabase(imdbid, data.Poster)}
			/>
			</Link>
		)
	}

	if (data && 'Poster' in data && data.Poster) {
		return printPoster(data)
	} else if ('cover_url' in record && record.cover_url) {
		return printCover(record)
	}



	return null
}

export default CoverArt
