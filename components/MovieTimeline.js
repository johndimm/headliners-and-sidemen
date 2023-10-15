import React, { useState, useEffect } from 'react'

const MovieTimeline = ({ release_group }) => {
	const [yearMovies, setYearMovies] = useState({})

	const getReleaseGroup = async (release_group) => {
		const url = `/api/release_group_set/${release_group}`
		const response = await fetch(url)
		const data = await response.json()
		console.log("data", data)

		const yearMov = {}
		const posters = {}
		const titles = {}
		data.forEach((movie, idx) => {
			if (movie.cover_url && movie.cover_url in posters) return
			if (movie.title && movie.title in titles) return
			posters[movie.cover_url] = 1
			titles[movie.title] = 1

			const date = movie.begin_date
			const year = date.substr(0, 4)
			//console.log(year, movie)
			if (!(year in yearMov)) yearMov[year] = []
			yearMov[year].push(
				<div
				    className='movie_card'
					key={idx}
					onClick={async function () {
						await getReleaseGroup(movie.release_group)
					}}
				>

					<div>{movie.title}</div>
					<img width='100' src={movie.cover_url} />
				</div>
			)
		})

		console.log('yearMov', yearMov)
		setYearMovies(yearMov)
	}

	console.log('release_group', release_group)

	useEffect(() => {
		getReleaseGroup(release_group)
	}, [])

	const years = []
	for (let y = 1860; y < 2024; y++) {
		years.push(y)
	}

	const yearsHtml = []
	years.forEach((year, idx) => {
		if (year in yearMovies) {
			yearsHtml.push(
				<td key={idx}>
					<div className='year_column'>
						{year}
						<hr />
						{yearMovies[year]}
					</div>
					<hr />
				</td>
			)
		}
	})

	console.log('yearMovies', yearMovies)
	// console.log('years', years)

	return (
		<table>
			<tbody>
				<tr>{yearsHtml}</tr>
			</tbody>
		</table>
	)
}

export default MovieTimeline
