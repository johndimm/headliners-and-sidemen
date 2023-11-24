import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CoverArt from '../components/CoverArt'
import TimeScrubber from '../components/TimeScrubber'
import BrowseLayout from 'components/BrowseLayout'
import ArtistReleases from 'components/ArtistReleases'

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

const Movie = ({ movie, num_years, setReleaseGroup }) => {
	const rank = movie.rank
	const primaryTitle = movie.primarytitle
	const tconst = movie.tconst
	const genres = movie.genres || ''

	const record = {
		release_group: tconst,
		cover_url: movie.cover_url,
		title: primaryTitle
	}

	const td_width = parseInt((1.0 / num_years) * 100)
	const size = td_width > 25 ? 'big' : 'small'

	return (
		<div className='movie' onClick={() => setReleaseGroup(tconst)}>
			<div className='img_holder'>
				<CoverArt record={record} data_source='imdb' size={size} />
			</div>
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
		year: 2023,
		genres: '',
		min_rank: 1,
		num_ranks: 10,
		max_local_rank: 20,
		num_years: 0,
		release_group: 'tt7286456',
		query: ''
	})
	const [yearRange, setYearRange] = useState({
		min_year: null,
		max_year: null
	})
	const [touchStart, setTouchStart] = useState(null)
	const [touchEnd, setTouchEnd] = useState(null)

	// menu is 3
	const topWall = { artist: 1, context: 1, wall: 4 }
	const topContext = { artist: 1, context: 4, wall: 1 }
	const topArtist = { artist: 4, context: 1, wall: 1 }

	const [zindex, setZindex] = useState(topWall)

	const [dataSource, setDataSource] = useState('')
	const [artistId, setArtistId] = useState('nm0290047')
	
	

	const callSetArtistId = (newArtistId) => {
		setZindex(topArtist)
		setArtistId(newArtistId)
	}

	useEffect(() => {
		const url = `/api/env/DATA_SOURCE/`
		axios
			.get(url)
			.then(function (response) {
				const data_source = response.data['DATA_SOURCE']
				if (data_source) setDataSource(data_source)
			})
			.catch((err) => err)
	}, [])

	useEffect(() => {
		/*
		const searchEl = document.getElementById("query")
		if (searchEl) {
			searchEl.addEventListener("search", (event) => {
				event.preventDefault()
				setParams({ ...params, query: event.currentTarget.value })
			});
		}
		*/

		const mw = document.body.clientWidth
		const num_years = Math.max(parseInt(mw / 200), 3)
		// console.log('num_years', num_years)
		const center_year = parseInt(2023 + 1 - (num_years / 2))
		console.log('center_year', center_year)
		setParams({
			...params,
			num_years: num_years,
			year: Math.min(params.year, center_year)
		})
	}, [])

	useEffect(() => {
		if (params.num_years != 0) {
			getData()
		}
	}, [params])

	const getData = () => {
		params.skim = !params.query || params.query == ''
		const p = ["year", "num_years", "max_local_rank", "skim"]
		if (params.skim) {
			p.push("num_ranks")
			p.push('min_rank')
		}
		const pstr = ["genres","query"]
		const kvi = p.map ( (field, idx) => {
			return `${field}=${params[field]}`
		}
		)
		const kvs = pstr.map ( (field, id) => {
			return `${field}='${params[field]}'`
		})

		const url = 'api/get_movies?' + kvi.join("&") + "&" + kvs.join("&")
		
		/*
		const oldparams = `year=${params.year}&genres='$years}&query='${params.query}'&skim=${params.skim}`

        console.log("url", url)
		console.log("oldparams", oldparams)
		*/

		getYears(url)
	}

	const getYears = async (url) => {
		// console.log(url)

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
				<div key={idx} className='year_cell' onClick={(e) => {
					e.preventDefault()
					setParams({ ...params, year: year })
				}}>
					{year}
				</div>
			</th>
		)
	})

	const setReleaseGroup = (release_group) => {
		setParams({ ...params, release_group: release_group })
		setZindex(topContext)
	}

	const moviesYears = Object.keys(years).map((year, idx) => {
		const movieColumn = years[year].map((movie, idx2) => {
			// const key = `${idx}-${idx2}`
			// return <div></div>
			// return null
			return (
				<Movie
					movie={movie}
					key={movie.tconst}
					num_years={params.num_years}
					setReleaseGroup={setReleaseGroup}
				/>
			)
		})

		const width = (1.0 / params.num_years) * 100
		const style = { width: `${width}%` }
		// return null

		return (
			<td style={style} key={year}>
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

	const numYearsSelector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, idx) => {
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
						setParams({
							...params,
							num_years: val,
							year: Math.min(params.year, parseInt(2023 - params.num_years / 2))
						})
					}}
				>
					{val}
				</span>
			)
	})

	const maxLocalRankSelector = [2, 3, 10, 20, 50, 100, 200].map((val, idx) => {
		if (val == params.num_ranks) {
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
					onClick={() => setParams({ ...params, num_ranks: val })}
				>
					{val}
				</span>
			)
	})

	const genreDropdown = genres.map((val, idx) => {
		// const checked = val == params.genres
		return (
			<option key={idx} value={val} defaultValue={params.genres}>
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

	const onTouchEnd = (e) => {
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

	const onKeyDown = (e) => {
		if (e.keyCode === 38) {
			const div = document.getElementById('wall')
			div.scrollBy({
				top: -350, // Math.sign(e.deltaY) * 100, // 100 pixels in the right direction
				behavior: 'smooth'
			})
			// console.log("up arrow pressed");
		} else if (e.keyCode === 40) {
			const div = document.getElementById('wall')
			div.scrollBy({
				top: 350, // Math.sign(e.deltaY) * 100, // 100 pixels in the right direction
				behavior: 'smooth'
			})
			// console.log("down arrow pressed");
		} else if (e.keyCode === 37) {
			goleft()
			// console.log("left arrow pressed");
		} else if (e.keyCode === 39) {
			goright()
			// console.log("right arrow pressed");
		}
	}

	const titles = { imdb: 'Movies', imdb_tv: 'TV Series' }
	const title = titles[dataSource]

	const Menu = () => {
		return (
			<div className='menu'>
				<div className='top_title'>{title}</div>
				<form className='top_form' onSubmit={handleSubmit}>
					<select className='genre' name='genre' onChange={handleSubmit}>
						{genreDropdown}
					</select>
					<input
						id='query'
						name='query'
						defaultValue={params.query}
						type='search'
						placeholder='search titles'
						size='12'
						onKeyDown={onKeyDown}
						autoFocus
					/>

					<input type='submit' value='&#128269;' />
				</form>

				<br />
				<TimeScrubber params={params} setParams={setParams} yearRange={yearRange} />
			</div>
		)
	}

	const Context = () => {
		return (
			<div className='context' style={{ zIndex: zindex['context'] }}>
				<div className='back_button_div'>
					<a onClick={() => setZindex(topWall)} className='back_button'>
						{' '}
						&larr; back
					</a>
				</div>
				<BrowseLayout
					release_group={params.release_group}
					setReleaseGroup={setReleaseGroup}
					callSetArtistId={callSetArtistId}
					noHeader={true}
				/>
			</div>
		)
	}

	const Artist = () => {
		return (
			<div className='artist' style={{ zIndex: zindex['artist'] }}>
				<div className='back_button_div'>
					<a onClick={() => setZindex(topContext)} className='back_button'>
						{' '}
						&larr; back
					</a>
				</div>

				<ArtistReleases
					artist_id={artistId}
					setReleaseGroup={setReleaseGroup}
					callSetArtistId={callSetArtistId}
					noHeader={true}
				/>
			</div>
		)
	}

	const Wall = () => {
		return (
			<div
				className='wall'
				style={{ zIndex: zindex['wall'] }}
				//onTouchStart={onTouchStart}
				//onTouchMove={onTouchMove}
				//onTouchEnd={onTouchEnd}
				id='wall'
			>
				<table className='movie_table' id='movie_table'>
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
		)
	}

	return (
		<div className='top'>
			<Menu />
			{Context()}
			<Artist />
			{Wall()}
		</div>
	)
}

/*

		<div className='top'>
			<Menu />
            <Context />
			<Artist />
			<Wall />
		</div>

*/

export default Movies
