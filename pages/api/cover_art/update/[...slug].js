import db from 'utils/db'

export default async function handler (req, res) {
  const { slug } = req.query
  const imdbid = slug[0] 
  const url = slug[1]
  const response = {} //await db.updateIMDbCoverArt(imdbid, url)
  console.log('updateIMDbCoverArt, imdbid, url', imdbid, url)
  res.status(200).json(response)
}