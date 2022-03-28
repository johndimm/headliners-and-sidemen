import BrowseLayout from 'components/BrowseLayout'

export default function Index() {
  const noms = {
      'Belfast': 'tt12789558',
      'Nightmare Alley': 'tt7740496',
      'The Power of the Dog': 'tt10293406',
      'Drive My Car': 'tt14039582',
      'Licorice Pizza': 'tt11271038',
      'West Side Story': 'tt11271038',
      'Dune':'tt1160419',
      'CODA': 'tt10366460',
      'King Richard': 'tt9620288',
      "Don't Look Up": 'tt11286314'
  }  

  const pictures = Object.keys(noms).map( (title, idx) => {
      return ( 
          <div style={{display: 'inline-block'}} key={idx}>
            <a target='constellations' href={'https://movies-and-actors.vercel.app/release_group/' + noms[title]}>
              <img className='oscar_poster' src={`/oscars/${title}.png`}/>
            </a>
          </div>
      )
  })

  return (
      <div style={{textAlign:'center'}}>
          <div style={{fontSize:'40pt', fontFamily:'Futura', fontWeight:'100'}}>
          Best Picture Nominees 2022
          </div>
          <div style={{fontStyle:'italic'}}>
              What were the actors in this year's Best Picture nominations doing before and after?
          </div>
          <div>
          {pictures}
          </div>
      </div>


  )
}