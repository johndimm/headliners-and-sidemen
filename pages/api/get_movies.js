import db from 'utils/db'

export default async function handler(req, res) {
	const {
		query: { year, genres, title_type, has_cover, max_local_rank, num_years }
	} = req

	const response = await db.getMovies(
        year,
		genres,
		title_type,
		has_cover,
		max_local_rank,
		num_years
	)

	// console.log("get_movies.js:", response)

	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.status(200).send(response)
}