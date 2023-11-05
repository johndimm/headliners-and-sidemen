import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CoverArt from '../components/CoverArt'
import TimeScrubber from '../components/TimeScrubber'
import BrowseLayout from 'components/BrowseLayout'

export const metadata = {
	viewport: `width=device-width, height='device-height', initial-scale: 1.0`
}

const genres = [
	'All Genres',
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

const Movie = ({ movie, idx, num_years, setReleaseGroup }) => {
	const rank = movie.rank
	const primaryTitle = movie.primarytitle
	const tconst = movie.tconst
	const genres = movie.genres || ''

	const record = {
		release_group: tconst,
		cover_url: movie.cover_url
	}

	const td_width = parseInt((1.0 / num_years) * 100)
	const size = td_width > 25 ? 'big' : 'small'

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
		release_group: 'tt7286456',
		query: ''
	})
	const [yearRange, setYearRange] = useState({
		min_year: null,
		max_year: null
	})
	const [touchStart, setTouchStart] = useState(null)
	const [touchEnd, setTouchEnd] = useState(null)

	const topMovieTable = { settings: 2, context: 1, movie_table: 3 }
	const topContext = { settings: 1, context: 3, movie_table: 2 }

	const [zindex, setZindex] = useState(topMovieTable)

	useEffect(() => {
		const mw = document.body.clientWidth
		const num_years = Math.max(parseInt(mw / 200), 3)
		console.log('num_years', num_years)
		setParams({ ...params, num_years: num_years })
	}, [])

	useEffect(() => {
		getData()
	}, [params])

	const getData = async () => {
		const skim = !params.query || params.query == ''
		const url = `api/get_movies?year=${params.year}&genres='${params.genres}'&max_local_rank=${params.max_local_rank}&num_years=${params.num_years}&query='${params.query}'&skim=${skim}`

		console.log(url)

		axios
			.get(url)
			.then(function (response) {
				const data = response['data']

				let min_year = null
				let max_year = null
				data.forEach((movie, idx) => {
					if (!min_year || min_year > movie.startyear) {
						min_year = movie.startyear
					}
					if (!max_year || max_year < movie.startyear) {
						max_year = movie.startyear
					}
				})
				setYearRange({ min_year: min_year, max_year: max_year })
				setMovies(data)
			})
			.catch((err) => err)
	}

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
		return (
			<th key={idx}>
				<div className='year_cell' onClick={() => setParams({ ...params, year: year })}>
					{year}
				</div>
			</th>
		)
	})

	const setReleaseGroup = (release_group) => {
		setParams({ ...params, release_group: release_group })
		setZindex(topContext)
	}

	const moviesYears = Object.keys(years).map((val, idx) => {
		const movieColumn = years[val].map((val2, idx2) => {
			// return RenderMovie(val2, idx2, params.num_years, setReleaseGroup)
			return (
				<Movie
					movie={val2}
					idx={idx2}
					num_years={params.num_years}
					setReleaseGroup={setReleaseGroup}
				/>
			)
		})

		const width = (1.0 / params.num_years) * 100
		const style = { width: `${width}%` }

		return (
			<td style={style} key={idx}>
				{movieColumn}
			</td>
		)
	})

	const goleft = () => {
		setParams({ ...params, year: parseInt(params.year) - parseInt(params.num_years) })
	}

	const goright = () => {
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

	const genreDropdown = genres.map((val, idx) => {
		return (
			<option key={idx} value={val}>
				{val}
			</option>
		)
	})

	const handleSubmit = (event) => {
		event.preventDefault()

		const form = document.forms[0] // e.target
		const formData = new FormData(form)

		let genres = formData.get('genre')

		if (genres == 'All Genres') {
			genres = ''
		}

		const query = formData.get('query')

		setParams({
			...params,
			genres: genres,
			query: query
		})
	}

	// The required distance between touchStart and touchEnd to be detected as a swipe
	const minSwipeDistance = 50

	const onTouchStart = (e) => {
		setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX)
	}

	const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return
		const distance = touchStart - touchEnd
		const isLeftSwipe = distance > minSwipeDistance
		const isRightSwipe = distance < -minSwipeDistance
		if (isLeftSwipe) {
			goright()
		}
		if (isRightSwipe) {
			goleft()
		}
	}

	return (
		<div className='movie_page'>
			<div className='menu' style={{ zIndex: zindex['settings'] }}>
				<div className='page_title'>Movies</div>
				<form className='top_form' onSubmit={handleSubmit}>
					<select className='genre' name='genre' onChange={handleSubmit}>
						{genreDropdown}
					</select>
					<input
						name='query'
						defaultValue={params.query}
						type='search'
						placeholder='search titles'
						size='12'
					/>
					<input type='submit' value='&#128269;' />
				</form>
				<br />
				<TimeScrubber params={params} setParams={setParams} />
			</div>

			<div className='context' style={{ zIndex: zindex['context'] }}>
				<a onClick={() => setZindex(topMovieTable)} style={{ cursor: 'pointer', fontSize: '18pt' }}>
					{' '}
					&larr; back
				</a>
				<BrowseLayout
					release_group={params.release_group}
					setReleaseGroup={setReleaseGroup}
					noHeader={true}
				/>
			</div>

			<div
				className='movie_table_div'
				style={{ zIndex: zindex['movie_table'] }}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<table className='movie_table'>
					<thead>
						<tr>{yearHeading}</tr>
					</thead>
					<tbody>
						<tr>{moviesYears}</tr>
					</tbody>
				</table>

				<div style={{ height: '200px' }}>
					Years on a page:
					{numYearsSelector}
					<br />
					Movies in a year:
					{maxLocalRankSelector}
				</div>
			</div>
		</div>
	)
}

export default Movies
