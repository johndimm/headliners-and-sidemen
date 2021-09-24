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
        <input placeholder='Search...' name='query' type='text' width='80'></input>
        <input type='submit' />
        <span className='page_title'>Headliners and Sidemen</span>
        <span className='page_subtitle'>What else were the musicians on an album doing before and after?</span>
        </form>

    </div>
}

export default Header