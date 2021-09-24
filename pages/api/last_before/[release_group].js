import db from 'utils/db'

export default async function handler (req, res) {
  const { release_group } = req.query
  const response = await db.lastBefore(release_group)
  res.status(200).json(response)
}
