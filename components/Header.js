import React, {useState, useEffect} from 'react'

const Header = () => {
    const [records, setRecords] = useState([])

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
            powered by: <a href='https://musicbrainz.org/'><img width='100' src='https://staticbrainz.org/MB/header-logo-1f7dc2a.svg' target='_blank'/></a>
        </div>
        <div className='page_title_div'>
          <div className='page_title'>Headliners and Sidemen</div>
          <div className='page_subtitle'>What were the musicians who played on this album doing before and after?</div>
        </div>
      </form>

    </div>
}

export default Header