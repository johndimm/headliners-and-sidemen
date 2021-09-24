import FirstAfter from 'components/FirstAfter'
import LastBefore from 'components/LastBefore'
import Center from 'components/Center'
import Header from 'components/Header'

const Index = () => {
    const release_group = 38581
    
    return <div>
    <Header />
    <table>
    <tbody><tr>
      <td>
        <LastBefore release_group={release_group} />
      </td>
      <td className='middle'>
        <Center release_group={release_group} />
      </td>
      <td>
        <FirstAfter release_group={release_group} />     
      </td>
    </tr></tbody>
  </table> 
  </div> 
}

export default Index
