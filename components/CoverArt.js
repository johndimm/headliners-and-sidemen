// import Image from 'next/image'

const CoverArt = ( { cover_url } ) => {
  if (!cover_url)
    return null
    
  return <img src={cover_url} alt='Cover Art' />
}

export default CoverArt
