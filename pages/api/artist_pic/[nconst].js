import axios from "axios"

const getTheMovieDatabase = async (nconst) => {
  const key = process.env['TMDB_KEY']

  const url = 'https://api.themoviedb.org/3/find/' + nconst

  // console.log('imdb url', url)

  var options = {
      method: 'GET',
      url: url, 
      params: {api_key: key, language: 'en-US', external_source: 'imdb_id'} 
  };

  // console.log ('imdb, options:', options)
  const response = await axios.request(options)
  const results = await response.data

  // console.log ("results", JSON.stringify(results,null,2))

  const size='small'
  const person = results.person_results[0]
  // console.log ("person", person)
  if (person && 'profile_path' in Object.keys(person)) {
    const profile_path = person.profile_path
    // const tmdb_id = person.id
  
    const width = size == 'small' ? 'w200' : 'w500'
    results.image_url = `https://image.tmdb.org/t/p/${width}/${profile_path}`
  }
  // console.log("imdb data:", data)
  return results
}


export default async function handler (req, res) {
  const { nconst } = req.query
  let response = {}
  response.results = await getTheMovieDatabase(nconst)
  res.status(200).json( response )
}