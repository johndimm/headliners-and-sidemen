import axios from "axios"

const getIMDbData = async (nconst) => {
    const key = process.env['IMDB_RAPIDAPI_KEY']

    var options = {
        method: 'GET',
        url: `https://data-imdb1.p.rapidapi.com/actor/id/${nconst}/`,
        headers: {
          'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
          'x-rapidapi-key': key
        }
      };

    // console.log ('useEffect, looking for cover art')
    const response = await axios.request(options)
    const data = await response.data
    return data
}

export default async function handler (req, res) {
  const { nconst } = req.query
  const response = await getIMDbData(nconst)
  res.status(200).json( response )
}