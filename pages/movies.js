import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Timeline from './timeline'
import CoverArt from '../components/CoverArt'
import TimeScrubber from '../components/TimeScrubber'
import BrowseLayout from 'components/BrowseLayout'

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

const renderMovie = (movie, idx, num_years, setReleaseGroup) => {
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

	const td_width = (1.0 / num_years) * 100
	const size = td_width > 25 ? 'small' : 'big'

	console.log('td_width', td_width)

	return (
		<div key={idx} className='movie' onClick={() => setReleaseGroup(tconst)}>
			<CoverArt record={record} data_source='imdb' size={size} />
			<div>{primaryTitle}</div>
			<div className='genres'>
				#{rank} -- {genres.replace(',', ', ')}
			</div>
		</div>
	)
}

const Movies = () => {


	const [data, setMovies] = useState([])
	const [params, setParams] = useState({
		year: 2021,
		genres: '',
		max_local_rank: 10,
		num_years: 4,
		release_group: 'tt7286456'
	})
	const movieRef = useRef(null)

	const topSettings = { settings: 3, context: 1, movie_table: 2 }
	const topMovieTable = { settings: 1, context: 2, movie_table: 3 }
	const topContext = { settings: 1, context: 3, movie_table: 2 }

	const [zindex, setZindex] = useState(topMovieTable)

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
					onClick={() => {
						setParams({ ...params, genres: '' })
						setZindex(topMovieTable)
					}}
				>
					{val}
				</span>
			) : (
				<span
					className='genre'
					key={idx}
					onClick={(e) => {
						setParams({ ...params, genres: val })
						setZindex(topMovieTable)
					}}
				>
					{val}
				</span>
			)

			return <div key={idx}>{genre}</div>
		})

		return (
			<div id='filterpanel' className='filterpanel'>
				<div className='page_title'>Wall of Movies</div>
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
		const mw = document.body.clientWidth;
		const num_years = Math.max(parseInt(mw / 200), 3)
		console.log('num_years', num_years)
		setParams({...params, num_years:num_years})
		numYearsChanged(num_years)
	}, [])

	useEffect(() => {
		getData()
	}, [params])

	const years = {}
	let firstYear = '3000'
	let lastYear = '1900'
	if (Array.isArray(data) && data.length > 0) {
		data.forEach((val, idx) => {
			const year = val.startyear
			if (year < firstYear) firstYear = year
			if (year > lastYear) lastYear = year

			if (!years.hasOwnProperty(year)) {
				years[val.startyear] = []
			}
			years[val.startyear].push(val)
		})
	}

	const yearHeading = Object.keys(years).map((year, idx) => {
		let onClick = null
		let style = {}
		if (year == firstYear) {
           onClick = () => setParams({ ...params, year: year })
           style = {"cursor": "w-resize"}
		} else if (year == lastYear) {
		   onClick = () => setParams({ ...params, year: year })	
           style = {"cursor": "e-resize"}
		} else {
			onClick = () => setZindex(topSettings)
			style = {"cursor": "n-resize"}
		}

		return (
			<th key={idx}>
				<div className='year_cell' onClick={onClick} style={style}>
					{year}
				</div>
			</th>
		)
	})

	const setReleaseGroup = (release_group) => {
		setParams({ ...params, release_group: release_group })
		setZindex(topContext)

		//movieRef.current.scrollIntoView({
		//	behavior: 'smooth',
		//	block: 'start'
		///})
	}

	const moviesYears = Object.keys(years).map((val, idx) => {
		const movieColumn = years[val].map((val2, idx2) => {
			return renderMovie(val2, idx2, params.num_years, setReleaseGroup)
		})

		const width = (1.0 / params.num_years) * 100
		const style = { width: `${width}%` }

		return (
			<td style={style} key={idx}>
				{movieColumn}
			</td>
		)
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
		<div className='movie_page'>
			<div className='settings' style={{ zIndex: zindex['settings'] }}>
				<div>
					<a onClick={() => setZindex(topMovieTable)}>back</a>
				</div>
				<FilterPanel setReleaseGroup={setReleaseGroup} />
				<TimeScrubber params={params} setParams={setParams} />
				Years on a page:
				{numYearsSelector}
				<br />
				Movies in a year:
				{maxLocalRankSelector}
			</div>

			<div className='context' ref={movieRef} style={{ zIndex: zindex['context'] }}>
				<a onClick={() => setZindex(topMovieTable)}>back</a>
				<BrowseLayout
					release_group={params.release_group}
					setReleaseGroup={setReleaseGroup}
					noHeader={true}
				/>
			</div>

			<div className='movie_table_div' style={{ zIndex: zindex['movie_table'] }}>
				<table className='movie_table' >
					<thead>
						<tr>{yearHeading}</tr>
					</thead>
					<tbody>
						<tr>{moviesYears}</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Movies
