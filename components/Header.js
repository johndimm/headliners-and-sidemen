import React, {useState} from 'react'
import Link from 'next/link'
// import Image from 'next/image'

const Header = () => {
    const search = async (e) => {
       e.preventDefault()
       const query = e.target[0].value
       window.location = `/search/${query}`
    }

    return <div className='form'>
      <form onSubmit={search}>
        <div className='search_input'>

            <input placeholder='Search...' name='query' type='text' width='80'></input>
            <input type='submit' />
            <br />
            powered by: <Link href='https://musicbrainz.org/' passHref={true}><img width='100' src='https://staticbrainz.org/MB/header-logo-1f7dc2a.svg' target='_blank' alt='musicbrainz'/></Link>
        </div>
        <div className='page_title_div'>
          <div className='page_title'><Link href="/">Headliners and Sidemen</Link></div>
          <div className='page_subtitle'>What were the musicians who played on this album doing before and after?</div>
        </div>
      </form>

    </div>
}

export default Header