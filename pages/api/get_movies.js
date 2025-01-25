import db from 'utils/db'

export default async function handler(req, res) {
	const {
		query: { year, genres, title_type, has_cover, min_local_rank, max_local_rank, num_years, query, skim, min_rank, num_ranks }
	} = req

	const response = await db.getMovies(
        year,
		genres,
		title_type,
		has_cover,
		min_local_rank,
		max_local_rank,
		num_years,
		query,
		skim,
		min_rank,
		num_ranks
	)

	// console.log("get_movies.js:", response)

	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.status(200).send(response)
}