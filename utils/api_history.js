import axios from 'axios'
// import rateLimit from 'axios-rate-limit';

const url_prefix = 'https://musicbrainz.org'
//const url_prefix = 'http://localhost:5000'

// const axios_http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1000, maxRPS: 1 })


const getRelations = async (recordingId, artists) => {
  const urls = artists.map ( (player, idx) => {
    return `${url_prefix}/ws/2/artist/${player.id}?inc=recording-rels&fmt=json`
  })
    
  const responses = await Promise.all(
    urls.map ( (url, idx) => {
      return axios.get(url)
    })
  )

  responses.forEach ( (response, idx) => {
    const data = response.data
    const relations = data.relations
    relations.forEach ( (relation, idx2) => {
      if (relation.recording.id == recordingId) {
        const beforeIdx = Math.max(0, idx2 - 10)
        artists[idx]['beforeRecording'] = relations[beforeIdx].recording.id 
        //console.log(relation)
      }
    })
  })

  return artists
}

const getRecordings = async (artists) => {
  const urls = artists.map ( (artist, idx) => {
    return `${url_prefix}/ws/2/recording/${artist.beforeRecording}?inc=releases&fmt=json`
  })

  const responses = await Promise.all(
    urls.map ( (url, idx) => {
      return axios.get(url)
      .catch(err => err)
    })
  )

  responses.forEach ( (response, idx) => {
    const data = response.data
    if (data && 'releases' in data)
      artists[idx]['beforeRelease'] = data.releases[0].id
    //console.log(data)
  })

  return artists
}

const getCovers = async (artists) => {
  const urls = artists.map ( (artist, idx) => {
    return `http://coverartarchive.org/release/${artist.beforeRelease}?fmt=json`
  })

  const responses = await Promise.all(
    urls.map ( (url, idx) => {
      return axios.get(url)
      .catch(err => err)
    })
  )

  responses.forEach ( (response, idx) => {
    const data = response.data
    if (data && 'images' in data)
      artists[idx]['beforeCoverArt'] = data.images[0].image
    //console.log(data)
  })

  return artists
}

const getArtists = async (releaseId) => {
    const url = `${url_prefix}/ws/2/release/${releaseId}?inc=recording-level-rels+recordings+artist-credits+artist-rels&fmt=json`

    const response = await axios.get(url)
    const data = await response.data

    const recording = data.media[0].tracks[0].recording
    const relations = recording.relations 
    let artists = relations.map ( (rel, idx) => {
        // console.log(rel)
        return {
            id: rel.artist.id,
            name: rel.artist.name, 
            instrument: rel.attributes[0], 
            type:rel.type
        }
    })
    const recordingId = recording.id
    return {artists, recordingId}
}

const getHistory = async (releaseId) => {
    let {artists, recordingId} = await getArtists(releaseId)
    artists = await getRelations(recordingId, artists)
    artists = await getRecordings (artists)
    artists = await getCovers(artists)
    return artists
}

export default getHistory