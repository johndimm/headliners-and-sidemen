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

const Variations = () => {
  return <div className='variations'>
    <ul>
    <li><a 
      title='from imdb: 186,000 TV series with 595,000 actors'
      href='https://cast-and-crew.herokuapp.com/'>186,000 TV Series</a></li>
    <li><a 
    title='from musicbrainz: 259,000 albums with 256,000 musicians' 
    href='https://headliners-and-sidemen.herokuapp.com/'>259,000 Albums</a></li>
    <li><a 
    title='from imdb: 573,000 movies with 1,403,000 actors'
    href='https://movies-and-actors.herokuapp.com/'>573,000 Movies</a></li>
    </ul>
  </div>
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

        <Variations />

          <a>
          <div className='page_title_div'>
                <div className='page_title'>Headliners and Sidemen</div>
                <div className='page_subtitle'>What were the musicians who played on this album doing before and after?
                </div>
          </div>
          </a>

      </form>

    </div>
}

const HeaderIMDb = ( {query} ) => {
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

      <Variations />

      <a>
      <div className='page_title_div'>
            <div className='page_title'>Cast and Crew</div>
            <div className='page_subtitle'>What did the cast and crew of this production do before and after?
            </div>
      </div>
      </a>

    </form>

  </div>
}

const Header = ({ data_source, query }) => {
  if (data_source == 'musicbrainz')
    return <HeaderMusicbrainz query={query}/>
  else if (data_source == 'imdb' || data_source == 'imdb_tv')
    return <HeaderIMDb query={query}/>
  else
    return null
}

export default Header