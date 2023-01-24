import axios from "axios"

const getTheMovieDatabase = async (nconst) => {
  const key = process.env['TMDB_KEY']
  const url = 'https://api.themoviedb.org/3/find/' + nconst

  var options = {
      method: 'GET',
      url: url, 
      params: {api_key: key, language: 'en-US', external_source: 'imdb_id'} 
  };

  // console.log ('imdb, options:', options)
  const response = await axios.request(options)
  const results1 = await response.data

  const person = results1.person_results[0]
  const tmdb_id = person.id
  
  const detailsUrl = 'https://api.themoviedb.org/3/person/' + tmdb_id
  options.url = detailsUrl

  const response2 = await axios.request(options)
  const results2 = await response2.data
  // console.log ("results2", JSON.stringify(results2,null,2))

  const results = {}
  results.partial_bio = results2.biography
  results.birth_date = results2.birthday
  results.birth_place = results2.place_of_birth
  results.name = results2.name

  const profile_path = results2.profile_path
  const size='big'
  const width = size == 'small' ? 'w200' : 'w500'
  results.image_url = `https://image.tmdb.org/t/p/${width}/${profile_path}`

  // console.log ("results", JSON.stringify(results,null,2))
  // console.log("imdb data:", data)
  return results
}


export default async function handler (req, res) {
  const { nconst } = req.query
  let response = {}
  response.results = await getTheMovieDatabase(nconst)
  res.status(200).json( response )
}