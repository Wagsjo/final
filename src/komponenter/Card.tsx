import '../styles/Card.css'
import { Hamster } from "../AtomsAndModels/HamsterModel"
import { fixUrl } from "../utils"
import {useRecoilState} from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"

interface Props {
  HamsterObj: Hamster;
}

const Card = (prop:Props) => {

  const [hamsters, setHamsters] = useRecoilState (hamsterObject)

  function img(prop: { HamsterObj: { imgName: string } }) {
    return (
      <div className={'property-image'} style={{backgroundImage: `url(${fixUrl('/img/' + prop.HamsterObj.imgName)})`}}></div>
    )
  }
  function promp(hamster: Hamster) {
    let answer = prompt(`Skriv  \"${hamster.name}\" för att bekräfta borttagning av hamster`)
    if(answer===hamster.name) {
      del(hamster.uid)
    }
  }

  function del(id: string | null) {
    fetch(fixUrl(`/hamsters/${id}`), {
        method: 'DELETE',
      })
      let newHamsters = hamsters.filter(h => {
        if(h.uid !== id) {
          return true
        } else {
          return false
        }
      })
      setHamsters(newHamsters)
    }

  return (
    <div>
      {prop.HamsterObj ?
        (<div className='cont' key={prop.HamsterObj.name} onClick={() => promp(prop.HamsterObj)}>
            <div className={'property-card'}>
              <a href="#">
                {img(prop)}
              </a>
              <div className={'property-description'}>
                <h5> {prop.HamsterObj.name} </h5>
                <p>Älskar att: {prop.HamsterObj.loves} </p>
                <p>{prop.HamsterObj.age} år gammal </p>
                <p>ID: {prop.HamsterObj.uid} </p>
                <p>Totala vinster: {prop.HamsterObj.wins} </p>
                <p>Totala förluster: {prop.HamsterObj.defeats} </p>
                <p>Totala matcher: {prop.HamsterObj.games} </p>
                <p>Äter helst: {prop.HamsterObj.favFood} </p>
              </div>
              <a href="#">
              </a>
            </div>
        </div>) :
        <p> Laddar hamstrar..</p>}

      </div>
  )
}
export default Card
