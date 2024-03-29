import axios from "axios"

const getTheMovieDatabase = async (imdbid) => {
    const key = process.env['TMDB_KEY']

    const url = 'https://api.themoviedb.org/3/find/' + imdbid

    // console.log('imdb url', url)

    var options = {
        method: 'GET',
        url: url, // 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        params: {api_key: key, language: 'en-US', external_source: 'imdb_id'} // {r: 'json', i: imdbid},
  //      headers: {
  //      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
  //      'x-rapidapi-key': key
  //      }
    };

    // console.log ('imdb, options:', options)
    const response = await axios.request(options)
    const data = await response.data
    // console.log("imdb data:", data)
    return data
}

export default async function handler (req, res) {
  const { imdbid } = req.query
  const response = await getTheMovieDatabase(imdbid)
  res.status(200).json( response )
}