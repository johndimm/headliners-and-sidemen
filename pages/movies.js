import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Timeline from './timeline'
import CoverArt from '../components/CoverArt'
import TimeScrubber from '../components/TimeScrubber'

export const metadata = {
	viewport: `width=device-width, height='device-height', initial-scale: 1.0`
}

const genres = [
	'Action',
	'Adult',
	'Adventure',
	'Animation',
	'Biography',
	'Comedy',
	'Crime',
	'Documentary',
	'Drama',
	'Family',
	'Fantasy',
	'Film-Noir',
	'Game-Show',
	'History',
	'Horror',
	'Music',
	'Musical',
	'Mystery',
	'News',
	'Reality-TV',
	'Romance',
	'Sci-Fi',
	'Short',
	'Sport',
	'Talk-Show',
	'Thriller',
	'War',
	'Western'
]

const renderMovie = (movie, idx, num_years) => {
	const rank = movie.rank
	const primaryTitle = movie.primarytitle
	const cover_url = movie.cover_url
	const tconst = movie.tconst
	const genres = movie.genres || ''
	const startYear = movie.startyear

	const url = `https://movies-and-actors.vercel.app/release_group/${tconst}`

	const record = {
		release_group: tconst,
		cover_url: movie.cover_url
	}

	const size = num_years < 5 ? 'big' : 'small'

	return (
		<div key={idx} className='movie'>
			<a href={url} target='_blank' rel='noreferrer'>
				<CoverArt record={record} data_source='imdb' size={size} />
				<div>{primaryTitle}</div>
				<div className='genres'>
					#{rank} -- {genres.replace(',', ', ')}
				</div>
			</a>
		</div>
	)
}

const Movies = () => {
	const [data, setMovies] = useState([])
	const [params, setParams] = useState({
		year: 2018,
		genres: '',
		max_local_rank: 10,
		num_years: 4
	})

	const zoom = (className, width, unit) => {
		console.log('zoom:', width)
		if (typeof window === 'undefined') return
		for (var i = 0; i < document.styleSheets.length; i++) {
			var sheet = document.styleSheets[i]

			for (let j = 0; j < sheet.cssRules.length; j++) {
				const rule = sheet.cssRules[j]
				const selector = rule.selectorText
				const style = rule.style
				if (selector == '.' + className) {
					style.width = width + unit
					return
				}
			}
		}
	}

	const getZoom = () => {
		if (typeof window === 'undefined') return
		for (var i = 0; i < document.styleSheets.length; i++) {
			var sheet = document.styleSheets[i]

			for (let j = 0; j < sheet.cssRules.length; j++) {
				const rule = sheet.cssRules[j]
				const selector = rule.selectorText
				const style = rule.style
				if (selector == '.movie') {
					return parseInt(style.width.replace('px', ''))
				}
			}
		}
	}

	const setSelectedYear = (year) => {
		setParams({ ...params, year: year })
	}

	const getDivWidth = (id) => {
		const element = document.getElementById(id)
		return element ? element.offsetWidth : null
	}

	const numYearsChanged = (num_years) => {
		const mw = getDivWidth('movie_page')
		const fw = getDivWidth('filterpanel')
		const w = mw - fw - 45
		const movieWidth = Math.floor(w / num_years) - 10
		//console.log(`w:${w}, movieWidth:${movieWidth}}`)
		// zoom('movie', movieWidth, 'px')
	}

	const repaint = () => {
		numYearsChanged(params.num_years)
	}

	const FilterPanel = () => {
		const handleSubmit = (event) => {
			const form = document.forms[0] // e.target
			const formData = new FormData(form)
			const formProps = Object.fromEntries(formData)

			const year = formData.get('year') || params.year
			const g = formData.getAll('genre') || params.genre
			const genres = g.join(',')
			const max_local_rank = formData.get('max_local_rank')
			const num_years = formData.get('num_years')

			setParams({
				...params,
				year: year,
				genres: genres,
				max_local_rank: max_local_rank,
				num_years: num_years
			})

			//if (num_years != params.num_years) {
			//	setTimeout(() => zoom(num_years), 100)
			//}
		}

		const genreSelector = genres.map((val, idx) => {
			const pattern = `${val}(,|$)`
			var re = new RegExp(pattern)
			const checked = params.genres.match(re)
			const genre = checked ? (
				<span
					className='selected'
					key={idx}
					style={{ cursor: 'pointer' }}
					onClick={() => setParams({ ...params, genres: '' })}
				>
					{val}
				</span>
			) : (
				<span className='genre' key={idx} onClick={(e) => setParams({ ...params, genres: val })}>
					{val}
				</span>
			)

			return <div key={idx}>{genre}</div>
		})



	

		return (
			<div id='filterpanel' className='filterpanel'>
				<div className='page_title'>Best Movies Ever</div>

				<form onChange={handleSubmit}>
					<div className='genre_selector'>{genreSelector}</div>
				</form>
			</div>
		)
	}

	const getData = async () => {
		const url = `api/get_movies?year=${params.year}&genres='${params.genres}'&max_local_rank=${params.max_local_rank}&num_years=${params.num_years}`

		axios
			.get(url)
			.then(function (response) {
				const data = response['data']
				setMovies(data)
			})
			.catch((err) => err)
	}

	useEffect(() => {
		numYearsChanged(params.num_years)
	}, [])

	useEffect(() => {
		const mw = getDivWidth('body')
		console.log('useEffect: mw', mw)
		getData()
	}, [params])

	const years = {}
	if (Array.isArray(data) && data.length > 0) {
		data.forEach((val, idx) => {
			// if (years[val.startyear] == undefined) {
			if (!years.hasOwnProperty(val.startyear)) {
				years[val.startyear] = []
			}
			years[val.startyear].push(val)
		})
	}

	const yearHeading = Object.keys(years).map((val, idx) => {
		return (
			<th key={idx}>
				<div className='year_cell'>{val}</div>
			</th>
		)
	})

	const moviesYears = Object.keys(years).map((val, idx) => {
		const movieColumn = years[val].map((val2, idx2) => {
			return renderMovie(val2, idx2, params.num_years)
		})

		return <td key={idx}>{movieColumn}</td>
	})

	const goleft = (e) => {
		setParams({ ...params, year: parseInt(params.year) - parseInt(params.num_years) })
	}

	const goright = (e) => {
		setParams({ ...params, year: parseInt(params.year) + parseInt(params.num_years) })
	}

	const numYearsSelector = [1, 2, 3, 4, 5, 6, 7, 8].map((val, idx) => {
		if (val == params.num_years)
			return (
				<span key={idx} className='selected'>
					{val}&nbsp;
				</span>
			)
		else
			return (
				<span
					key={idx}
					className='rank_selector'
					onClick={() => {
						setParams({ ...params, num_years: val })
						numYearsChanged(val)
					}}
				>
					{val}
				</span>
			)
	})

	const maxLocalRankSelector = [3, 10, 20, 50, 100, 200].map((val, idx) => {
		if (val == params.max_local_rank) {
			return (
				<span key={idx} className='selected'>
					{val}&nbsp;
				</span>
			)
		} else
			return (
				<span
					key={idx}
					className='rank_selector'
					onClick={() => setParams({ ...params, max_local_rank: val })}
				>
					{val}
				</span>
			)
	})


	return (
		<div className="movie_page">
			<FilterPanel />

			<TimeScrubber params={params} setParams={setParams} />
			
			<table className='movie_table'>
				<thead>
					<tr>{yearHeading}</tr>
				</thead>
				<tbody>
					<tr>{moviesYears}</tr>
				</tbody>
			</table>
			<div className="settings">
				<h2>Settings</h2>
				across: {numYearsSelector}
				<br />
				down: {maxLocalRankSelector}
			</div>







		</div>
	)
}

export default Movies
