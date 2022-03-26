import db from 'utils/db'

export default async function handler (req, res) {
  const body = JSON.parse(req.body)
  const imdbid = body.imdbid
  const cover_url = body.cover_url

  const response = await db.updateIMDbCoverArt(imdbid, cover_url)
  // console.log('updateIMDbCoverArt, imdbid, cover_url', imdbid, cover_url)
  res.status(200).json(response)
}