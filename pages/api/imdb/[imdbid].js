import axios from "axios"

const getIMDbData = async (imdbid) => {
    const key = process.env['IMDB_RAPIDAPI_KEY']

    var options = {
        method: 'GET',
        url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        params: {r: 'json', i: imdbid},
        headers: {
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key': key
        }
    };

    // console.log ('useEffect, looking for cover art')
    const response = await axios.request(options)
    const data = await response.data
    return data
}

export default async function handler (req, res) {
  const { imdbid } = req.query
  const response = await getIMDbData(imdbid)
  res.status(200).json( response )
}