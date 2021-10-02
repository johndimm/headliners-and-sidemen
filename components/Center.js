import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CoverArt from 'components/CoverArt'
import Artist from 'components/Artist'

const IMDbImage = ( {imdbid} ) => {
  const [data, setData] = useState({})

  var options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {r: 'json', i: imdbid},
    headers: {
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
      'x-rapidapi-key': '7c50e30be4msh46ea378278c3277p1a0889jsnadf4767451d5'
    }
  };

  useEffect( () => {
    axios.request(options).then(function (response) {
      console.log('AltIMDbImage:', response.data);
      const poster_url = response.data
      if (poster_url != 'N/A')
        setData(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  },[imdbid])

  let image
  if (data && 'Poster' in data) {
    console.log('data.Poster:', data.Poster)
    image =  <img src={data.Poster} alt='cover_art' />

    // Save it.
    const cover_url = encodeURIComponent(data.Poster)
    const fetchUrl = `/api/cover_art/update/${imdbid}/${cover_url}`
    console.log('fetchUrl', fetchUrl)
    fetch(fetchUrl)

  }
  return <div>{image}</div>
}

const oldIMDbImage = ( {imdbid}) => {
  const [data, setData] = useState({})

  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-base',
    params: {tconst: imdbid},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': 'GEuSb6FUftp2lzzZ2wkQkYSGKcFhvkJT'
    }
  }

  useEffect(() => {
    axios.request(options).then(function (response) {
      console.log(response.data);
      setData(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }, [imdbid])

  let image = ''
  console.log('IMDB image, data:', data)

  if (data && 'image' in data) {
    console.log(data.image.url)
    image =  <img src={data.image.url} alt='cover_art' />

    // Save it.
    const cover_url = encodeURIComponent(data.image.url)
    const fetchUrl = `/api/cover_art/update/${imdbid}/${cover_url}`
    console.log('fetchUrl', fetchUrl)
    fetch(fetchUrl)

  }
  return <div>{image}</div>
}

const Center = ( {release_group, data_source}) => {
    const [data, setData] = useState ([])
    console.log('data_source', data_source)
    useEffect( () => {
        const url = `/api/release_group/${release_group}`
        axios.get(url).then(function (response) {
            // console.log("Center, data", response.data)
            setData(response.data)
        }).catch(err => err)
    },[release_group])

    let artists 
    let release
    let begin_date = '2200-01-01'
    let coverArt
    if (Array.isArray(data) && data.length > 0) {
      // console.log(data[0], data[0].release_group_gid)
      if (data[0].cover_url) {
        const bigCover = data[0].cover_url.replace('250.jpg', '500.jpg')
        // console.log('bigCover', bigCover)
        coverArt = <img src={bigCover} alt='Cover Art' />
      } else if (data_source == 'imdb') {
        // const workingId = 'tt0944947'
        const imdbid = 'tt' + data[0].release_group.toString().padStart(7, '0')
        console.log("going for ", imdbid)
        coverArt = <IMDbImage imdbid={imdbid} />
      }

      artists = data.map( (record, idx) => {
        if (record.begin_date < begin_date)
           begin_date = record.begin_date 
        return <Artist key={idx} record={record} />
      })

      begin_date = begin_date.toString().replace('-01-01','')

      release = <div>
          <div className='date'>{begin_date}</div>
          <div className='title'>{data[0].title}</div>
          <div className='headliner'>{data[0].headliner}</div>
          {coverArt}
        </div>
    }

    return <div>{release}{artists}</div>
}

export default Center