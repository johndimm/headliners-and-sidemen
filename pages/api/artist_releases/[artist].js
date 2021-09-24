import db from 'utils/db'

export default async function handler (req, res) {
  const { artist } = req.query
  const response = await db.artistReleases(artist)
  res.status(200).json(response)
}