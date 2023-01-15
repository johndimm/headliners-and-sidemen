import db from 'utils/db'

export default async function handler (req, res) {
  const {
    query: { slug },
} = req;
  const artist_id = slug[0]
  const artist_seq = slug[1]

  const response = await db.lastBefore(artist_id, artist_seq)
  res.status(200).json(response)
}
