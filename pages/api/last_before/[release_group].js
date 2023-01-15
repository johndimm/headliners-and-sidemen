import db from 'utils/db'

export default async function handler (req, res) {
  const { release_group } = req.query
  const response = await db.lastBefore(release_group)
  console.log('last_before for release group', response)
  res.status(200).json(response)
}
