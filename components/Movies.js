import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CoverArt from '../components/CoverArt'
import TimeScrubber from '../components/TimeScrubber'
import BrowseLayout from 'components/BrowseLayout'
import ArtistReleases from 'components/ArtistReleases'
import Map from 'components/Map'

export const metadata = {
	viewport: `width=device-width, height='device-height', initial-scale: 1.0`
}

// import genres from 'utils/genres-musicbrainz'
import genres from 'utils/genres-imdb'

const ArrowkeyController = ({ oneStep, isSelected }) => {

	const textInput = useRef(null);

	useEffect(()=>{
       if (isSelected) {
		 textInput.current.focus()
	   }
	},[isSelected])

    const onKeyDown = (e) => {
        e.preventDefault()
        if (e.keyCode === 38) {
            // console.log("up arrow pressed");
            oneStep(0, -1)
        } else if (e.keyCode === 40) {
            oneStep(0, 1)
            // console.log("down arrow pressed");
        } else if (e.keyCode === 37) {
            oneStep(-1, 0)
            // console.log("left arrow pressed");
        } else if (e.keyCode === 39) {
            oneStep(1, 0)
            // console.log("right arrow pressed");
        }
    }

	// 	  style={{"position":"absolute", "visibility":"hidden"}}
    return <input 
	  id='key_arrow_input2' 
	  className='game_input' 
	  type="text" 
	  width="3s" 
	  ref={textInput}
	  onKeyDown={onKeyDown}
	  style={{"fontSize":"1px", 
	  "width": "1px"}}
></input>

}


const Movie = ({ movie, num_years, setReleaseGroup, oneStep }) => {
	const rank = movie.rank
	const primaryTitle = movie.primarytitle
	const tconst = movie.tconst
	const genres = movie.genres || ''
	const [isSelected, setIsSelected] = useState(false)

	const record = {
		release_group: tconst,
		cover_url: movie.cover_url,
		title: primaryTitle
	}

	const td_width = parseInt((1.0 / num_years) * 100)
	const size = td_width > 25 ? 'big' : 'small'

	const onClick = (e) => {
	   e.preventDefault()
       setIsSelected(true)
	}

	// onClick={() => setReleaseGroup(tconst)}

	return (
		<div className='movie' onClick={onClick} >
			<div className='img_holder'>
				<CoverArt record={record} data_source='imdb' size={size} />
			</div>

			<div>{primaryTitle}</div>
			<div className='genres'>
				#{rank} &nbsp;
			    <ArrowkeyController oneStep={oneStep} isSelected={isSelected}/>
				&nbsp;
				{genres.replace(',', ', ')}
			</div>

		</div>
	)
}

const Spotify = ({ spotifyAlbum, dataSource }) => {
	if (dataSource == 'musicbrainz' && spotifyAlbum) {
		const spotify_source = `https://open.spotify.com/embed/album/${spotifyAlbum}`

		return (
			<iframe
				className='spotify_embed'
				src={spotify_source}
				width='100%'
				height='80'
				frameBorder='0'
				allowFullScreen=''
				allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
			></iframe>
		)
	}
	return <></>
}

const Menu = ({ params, setParams, dataSource, yearRange, spotifyAlbum }) => {
	let genreDropdown = <></>
	if (genres && genres.length > 0)
		genreDropdown = genres.map((val, idx) => {
			// const checked = val == params.genres
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
/*
		if (genres == 'All Genres') {
			genres = ''
		}
		*/

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

	return (
		<div className='menu'>
			<div className='wall_menu'>
				<div className='top_title'>{title}</div>

				<form className='top_form' onSubmit={handleSubmit}>
					<select
						className='genre'
						name='genre'
						onChange={handleSubmit}
						defaultValue={params.genres}
					>
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
					/>

					<input type='submit' value='&#128269;' />
				</form>

				<br />
				<TimeScrubber params={params} setParams={setParams} yearRange={yearRange} />
			</div>

			<Spotify spotifyAlbum={spotifyAlbum} dataSource={dataSource} />
		</div>
	)
}

const Context = ({
	release_group,
	setReleaseGroup,
	setZindex,
	callSetArtistId,
	setSpotifyAlbum,
	zindex,
	topWall
}) => {
	return (
		<div className='context' style={{ zIndex: zindex['context'] }}>
			<div className='back_button_div'>
				<a onClick={() => setZindex(topWall)} className='back_button'>
					{' '}
					&larr; back
				</a>
			</div>
			<BrowseLayout
				release_group={release_group}
				setReleaseGroup={setReleaseGroup}
				callSetArtistId={callSetArtistId}
				setSpotifyAlbum={setSpotifyAlbum}
				noHeader={true}
			/>
		</div>
	)
}

const Wall = ({ params, setParams, data, zindex, setReleaseGroup, oneStep }) => {
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
				<div
					key={idx}
					className='year_cell'
					onClick={(e) => {
						e.preventDefault()
						setParams({ ...params, year: year })
					}}
				>
					{year}
				</div>
			</th>
		)
	})

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
					oneStep={oneStep}
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

	const maxLocalRankSelector = [2, 3, 10, 20, 50, 100, 200, 2000, 6000].map((val, idx) => {
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

const Artist = ({ artistId, setReleaseGroup, callSetArtistId, zindex, setZindex, topContext }) => {
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

const Movies = () => {
	const [data, setMovies] = useState([])
	const [params, setParams] = useState({
		year: 2023,
		genres: "All Genres",
		min_rank: 1,
		num_ranks: 10,
		min_local_rank: 0,
		max_local_rank: 20,
		num_years: 0,
		release_group: '', // 'tt8543390', //'tt7286456',
		query: '',
		quadId: ''
	})
	const [yearRange, setYearRange] = useState({
		min_year: null,
		max_year: null
	})
	const [touchStart, setTouchStart] = useState(null)
	const [touchEnd, setTouchEnd] = useState(null)

	// menu is 5
	const topWall = { artist: 1, context: 1, wall: 4 }
	const topContext = { artist: 1, context: 4, wall: 1 }
	const topArtist = { artist: 4, context: 1, wall: 1 }

	const [zindex, setZindex] = useState(topWall)

	const [dataSource, setDataSource] = useState('')
	const [artistId, setArtistId] = useState('')
	const [spotifyAlbum, setSpotifyAlbum] = useState(0)

	const callSetArtistId = (newArtistId) => {
		setZindex(topWall)
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
		const mw = document.body.clientWidth
		const num_years = Math.max(parseInt(mw / 300), 3)
		// console.log('num_years', num_years)
		const center_year = parseInt(2023 + 1 - num_years / 2)
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


    const oneStep = (x,y) => {
		console.log (`Go ${x} ${y}`)
		const newYear = params.year + x
		const newMinRank = params.min_rank + y
		console.log(`newYear:${newYear}, newMinRank:${newMinRank}`)
		setParams({...params, year:newYear, min_rank:newMinRank})
	}

	const getData = () => {
		params.skim = !params.query || params.query == ''
		const p = ['year', 'num_years', 'min_local_rank', 'max_local_rank', 'skim']
		//if (params.skim) {
			p.push('num_ranks')
			p.push('min_rank')
		//}
		const pstr = ['genres', 'query']
		const kvi = p.map((field, idx) => {
			return `${field}=${params[field]}`
		})
		const kvs = pstr.map((field, id) => {
			return `${field}='${params[field]}'`
		})

		const url = 'api/get_movies?' + kvi.join('&') + '&' + kvs.join('&')
		getYears(url)
	}

	const getYears = async (url) => {
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

	const setReleaseGroup = (release_group) => {
		setParams({ ...params, release_group: release_group })
		setZindex(topContext)
	}

	const goleft = () => {
		setParams({ ...params, year: parseInt(params.year) - parseInt(params.num_years) })
	}

	const goright = () => {
		setParams({ ...params, year: parseInt(params.year) + parseInt(params.num_years) })
	}

	const setQuad = (quad, selectedQuadId) => {
		if (!quad) return

		params.year = quad.min_year

		// const genres = quad.genre == 'All Genres' ? null : quad.genre
			
		const num_years = quad.max_year - quad.min_year + 1
		const year = parseInt(quad.min_year + num_years / 2)
		const newParams = {
			...params, year: year,
			num_years: num_years,
			min_local_rank: quad.min_rank,
			max_local_rank: quad.max_rank,
			genres: quad.genre,
			min_rank: null,
			quadId: selectedQuadId
		}

		console.log("newParams", newParams)

		setParams (newParams)
		setTimeout (() => 
		setZindex(topWall), 500)
	}

	return (
		<div className='top'>
			<Map 
			  selectedQuadId={params.quadId} 
			  setQuad={setQuad} 
			  num_years={params.num_years} 
			  artistId={artistId}/>

			<Context
				release_group={params.release_group}
				zindex={zindex}
				setReleaseGroup={setReleaseGroup}
				setZindex={setZindex}
				callSetArtistId={callSetArtistId}
				setSpotifyAlbum={setSpotifyAlbum}
				topWall={topWall}
			/>
			<Artist
				artistId={artistId}
				setReleaseGroup={setReleaseGroup}
				callSetArtistId={callSetArtistId}
				zindex={zindex}
				setZindex={setZindex}
				topContext={topContext}
			/>
			<Wall
				params={params}
				setParams={setParams}
				data={data}
				zindex={zindex}
				setReleaseGroup={setReleaseGroup}
				oneStep={oneStep}
			/>
		</div>
	)
}

/*
<Menu
params={params}
setParams={setParams}
dataSource={dataSource}
yearRange={yearRange}
spotifyAlbum={spotifyAlbum}
/>
*/

export default Movies
