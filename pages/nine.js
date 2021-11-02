
const Nine = () => {
    const images = [
        {
            src: "bardot.png", 
            url: 'https://movies-and-actors.herokuapp.com/release_group/tt0057345'
        },
        {
            src: "bill-evans.png", 
            url: 'https://headliners-and-sidemen.herokuapp.com/release_group/12537215-4248-3915-a730-b6df850f9229'
        },
        {
            src: "bollywood.png", 
            url: 'https://movies-and-actors.herokuapp.com/release_group/tt1857740'
        },
        {
            src: "circus.png", 
            url: 'https://cast-and-crew.herokuapp.com/release_group/tt5351176'
        },
        {
            src: "lost-squadron.png", 
            url: 'https://movies-and-actors.herokuapp.com/release_group/tt0023151'
        },  
        {
            src: "outsiders.png", 
            url: 'https://cast-and-crew.herokuapp.com/release_group/tt4816626'
        },        
        {
            src: "ren-and-stimpy.png", 
            url: 'https://cast-and-crew.herokuapp.com/release_group/tt0371475'
        },   
        {
            src: "undercurrent.png", 
            url: 'https://movies-and-actors.herokuapp.com/release_group/tt0039066'
        },       
        {
            src: "woman-from-tangier.png", 
            url: 'https://movies-and-actors.herokuapp.com/release_group/tt0178991'
        }
    ]

    const grid = images.map ( (image, idx) => {
        if (image.src)
        return <a href={image.url} target='_blank' rel='noreferrer'><img style={{'maxWidth':'350px'}} src={'nine/' + image.src} /></a>
    })

  return <div style={{textAlign: 'center'}}>
           <h2 style={{fontSize:'24pt'}}>The Graph of Collaborations </h2>
             <div style={{fontSize:'14pt','marginBottom':'10px'}}>What were the people on this production doing before and after?</div>
           <div>Sample pages to get started.</div>
           {grid}
           </div>
}

export default Nine