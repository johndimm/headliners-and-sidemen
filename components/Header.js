import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
// import Image from 'next/image'

const GitHub = () => {
  return <Link href="https://github.com/johndimm/headliners-and-sidemen/" passHref={true}>
          <span className='link_span'>
          <img height='30' src="/GitHub-Logos/GitHub_Logo.png" />
          </span>
          </Link>
}



const Variations =  ({data_source})  => {
  const movie_class = data_source == 'imdb' ? 'selected_variation' : ''
  const tv_class = data_source == 'imdb_tv' ? 'selected_variation' : ''
  const music_class = data_source == 'musicbrainz' ? 'selected_variation' : ''

  const movie_href = data_source == 'imdb' ? null : 'https://movies-and-actors.herokuapp.com/'
  const tv_href = data_source == 'imdb_tv' ? null : 'https://cast-and-crew.herokuapp.com/'
  const music_href = data_source == 'musicbrainz' ? null : 'https://cast-and-crew.herokuapp.com/'

  return <div className='variations'>
    <ul>
    <li className={movie_class}><a 
      title='from imdb: 573,000 movies with 1,403,000 actors'
      href={movie_href}
      >573,000 Movies</a></li>
    <li className={tv_class}><a 
      title='from imdb: 186,000 TV series with 595,000 actors'
      href={tv_href}>186,000 TV Series</a></li>
    <li className={music_class}><a 
      title='from musicbrainz: 259,000 albums with 256,000 musicians' 
      href={music_href}>259,000 Albums</a></li>
    </ul>
  </div>
}

const titles = { 
  "imdb": {
    title: "Constellations", 
    subtitle:'What did the actors on this movie do before and after?'
  },
  "imdb_tv": {
    title: 'Cast and Crew',
    subtitle:'What did the cast and crew of this TV series do before and after?'
  },
  "musicbrainz": {
    title: 'Headliners and Sidemen',
    subtitle: 'What did the musicians on this album do before and after?'
  }
}

const HeaderMusicbrainz = ({query}) => {
    const search = async (e) => {
       e.preventDefault()
       const query = e.target[0].value
       window.location = `/search/${query}`
    }

    return <div className='header'>
      <form onSubmit={search}>
        <div className='search_input'>

            <input placeholder='Search...' name='query' type='text' width='80' defaultValue={query}></input>
            <input type='submit' />
            <br />
            powered by: <Link href='https://musicbrainz.org/' passHref={true}><img width='100' src='https://staticbrainz.org/MB/header-logo-1f7dc2a.svg' target='_blank' alt='musicbrainz'/></Link>
     
            <GitHub />

        </div>

        <Variations data_source='musicbrainz'/>

          <a>
          <div className='page_title_div'>
                <div className='page_title'>{titles['musicbrains'].title}</div>
                <div className='page_subtitle'>{titles['musicbrainz'].subtitle}</div>
          </div>
          </a>

      </form>

    </div>
}

const HeaderIMDb = ( {query, data_source} ) => {
  const search = async (e) => {
     e.preventDefault()
     const query = e.target[0].value
     window.location = `/search/${query}`
  }

  return <div className='header'>
    <form onSubmit={search}>
      <div className='search_input'>

          <input placeholder='Search...' name='query' type='text' width='80' defaultValue={query}></input>
          <input type='submit' />
          <br />
          powered by: 
          <Link href='https://imdb.com/' passHref={true}>
          <span className='link_span'>
          <img height='30' src='https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png' target='_blank' alt='IMDb'/>
          </span>
          </Link>

          <GitHub />

      </div>

      <Variations data_source={data_source}/>

      <a>
      <div className='page_title_div'>
            <div className='page_title'>{titles[data_source].title}</div>
            <div className='page_subtitle'>{titles[data_source].subtitle}</div>
      </div>
      </a>

    </form>

  </div>
}

const Header = ({ data_source, query }) => {
  if (data_source == 'musicbrainz')
    return <HeaderMusicbrainz query={query}/>
  else if (data_source == 'imdb' || data_source == 'imdb_tv')
    return <HeaderIMDb query={query} data_source={data_source}/>
  else
    return null
}

export default Header