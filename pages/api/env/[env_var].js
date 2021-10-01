import db from 'utils/db'

export default async function handler (req, res) {
  const { env_var } = req.query
  const accept = { 'DATA_SOURCE': 1 }
  const response = {}

  if ( env_var in accept) {
    const value = process.env[env_var]
    response[env_var] = value
  }
  res.status(200).json( response )
}