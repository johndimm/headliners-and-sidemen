import axios from "axios"

const getIMDbData = async (nconst) => {
    const key = process.env['IMDB_RAPIDAPI_KEY']

    const options = {
      method: 'GET',
      url: 'https://online-movie-database.p.rapidapi.com/actors/get-bio',
      params: {nconst: nconst},
      headers: {
        'x-rapidapi-key': key,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };

    try {
    const response = await axios.request(options)
    const results = await response.data

    // Fix up this new stuff to look like the old.
    if ("image" in results) 
      results.image_url = results.image.url
    if ("miniBios" in results && results.miniBios.length > 0)
      results.partial_bio = results.miniBios[0].text

    // console.log('getIMDBData', data)
    return results
    } catch {
      return {}
    }
}

export default async function handler (req, res) {
  const { nconst } = req.query
  let response = {}
  response.results = await getIMDbData(nconst)
  res.status(200).json( response )
}