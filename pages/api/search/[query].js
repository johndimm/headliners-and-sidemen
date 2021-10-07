import db from 'utils/db'

export default async function handler (req, res) {
  const { query } = req.query
  const response = await db.search(query.trim())
  res.status(200).json(response)
}