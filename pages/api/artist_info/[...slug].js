import axios from "axios"
import db from 'utils/db'

const getIMDbData = async (nconst) => {
    // const key = process.env['IMDB_RAPIDAPI_KEY']
    const key = 'GEuSb6FUftp2lzzZ2wkQkYSGKcFhvkJT'

    var older_options = {
      method: 'GET',
      url: `https://data-imdb1.p.rapidapi.com/actor/id/${nconst}/`,
      headers: {
        'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
        'x-rapidapi-key': key
      }
    };

    const options = {
      method: 'GET',
      url: 'https://online-movie-database.p.rapidapi.com/actors/get-bio',
      params: {nconst: nconst},
      headers: {
        'x-rapidapi-key': key,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };


    const response = await axios.request(options)
    const data = await response.data

    // console.log('getIMDBData', data)
    return data
}

export default async function handler (req, res) {
  const { slug } = req.query
  const artist_id = slug[0]

  let r = await getIMDbData(artist_id)
  let response = {}
  response.results = {}
  if (r && "name" in r) {
    if ("image" in r) {
      r.image_url = r.image.url
    }
    response.results = r
  }
  
  
  if (slug.length > 1) {
    const artist_seq = slug[1]
    const before = await db.lastBeforeArtist(artist_id, artist_seq)
    const after = await db.firstAfterArtist(artist_id, artist_seq)

    response.results["before"] = before
    response.results["after"] = after
  }
  
  res.status(200).json( response )
}