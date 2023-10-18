import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import Timeline from './timeline'
import CoverArt from '../components/CoverArt'

export const metadata = { viewport: 
    `width=device-width, height='device-height', initial-scale: 1.0`
  }

// import NoSSR from 'react-no-ssr';

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
	//return <>{JSON.stringify(movie, null, 2)}</>
	// return <img width="200" src={movie.cover_url} />

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
			<a href={url} target='_blank' rel="noreferrer">
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
		year: 2020,
		genres: '',
		max_local_rank: 3,
		num_years: 7
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
		const element = document.getElementById(id);
		return element ? element.offsetWidth : null
	}

	const numYearsChanged = (num_years) => {
		const zoomValues = [500, 500, 380, 281, 224, 181, 156, 136, 121, 105]
		//const factors = [0.42, 0.84, 0.96, 0.95, 0.95, 0.92, 0.92, 0.92, 0.92, 0.89]
		//const baseWidth = 100.0 // 1179
		//const movieWidth = (baseWidth / params.num_years) * factors[val-1]
		//console.log(movieWidth)

		//const pc = 50.0 / parseInt(val)
		//zoom(pc, "movie_table td", "pc")
		//zoom (pc, "movie", "pc")

		const mw = getDivWidth('movie_page')
		const fw = getDivWidth('filterpanel')
		const w = mw - fw - 45
		const movieWidth = Math.floor(w / num_years) - 10 // 60 + num_years * 6

		console.log(`w:${w}, movieWidth:${movieWidth}}`)

		//const movieWidth = zoomValues[num_years - 1]
		zoom('movie', movieWidth, 'px')
	}

	const FilterPanel = () => {
		const handleSubmit = (event) => {
			// event.preventDefault()

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
			const checked = params.genres.includes(val)
			const genre = checked ? (
				<span
					className='selected'
					style={{ cursor: 'pointer' }}
					onClick={() => setParams({ ...params, genres: '' })}
				>
					{val}
				</span>
			) : (
				<span className='genre' onClick={(e) => setParams({ ...params, genres: val })}>
					{val}
				</span>
			)

			return <div key={idx}>{genre}</div>
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
							setParams({ ...params, num_years: val })
							numYearsChanged(val)
						}}
					>
						{val}
					</span>
				)
		})

		return (
			<div id='filterpanel' className='filterpanel'>
				<div className='page_title'>Best Movies Ever</div>

				<input
					width='240'
					type='range'
					step='1'
					min='25'
					max='1000'
					defaultValue={getZoom()}
					onChange={(e) => zoom('movie', e.currentTarget.value, 'px')}
				/>

				<form onChange={handleSubmit}>
					<hr />
					<div className='selectors'>
						<a title='the number of years to show at once'>across</a>: {numYearsSelector}
						<br />
						<a title='the number of movies for each year'>down</a>: {maxLocalRankSelector}
					</div>
					<hr />

					<div className='genre_selector'>{genreSelector}</div>
				</form>
			</div>
		)
	}

	const getData = async () => {
		const url = `api/get_movies?year=${params.year}&genres='${params.genres}'&max_local_rank=${params.max_local_rank}&num_years=${params.num_years}`

		//min_year=${params.min_year}&max_year=${params.max_year}&min_rank=${params.min_rank}&max_rank=${params.max_rank}&genres='${params.genres}'&,max_local_rank=${params.max_local_rank}`

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
		getData()
	}, [params])

	useLayoutEffect(() => {
		//const { height } = ref.current.getBoundingClientRect();
		// setTooltipHeight(height);
		numYearsChanged(params.num_years)
	}, []);

  
	const years = {}
	if (Array.isArray(data) && data.length > 0) {
		data.forEach((val, idx) => {
			// if (years[val.startyear] == undefined) {
			if (! years.hasOwnProperty(val.startyear)) {
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


	return (
		<div id="movie_page" className='movie_page'>
			<FilterPanel />
			<div className='movie_div'>
				<div className='timeline_div'>
					<button onClick={goleft}>&lt;</button>
					<Timeline
						display_year={params.year}
						setSelectedYear={setSelectedYear}
						num_years={params.num_years}
					/>
					<button onClick={goright}>&gt;</button>
				</div>
				<table className='movie_table'>
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
