import db from 'utils/db'

export default async function handler (req, res) {
  const { release_group } = req.query
  const response = await db.releaseGroup(release_group)
  console.log('release_group', response)
  res.status(200).json(response)
}

