import '../styles/Card.css'
import { Hamster } from "../AtomsAndModels/HamsterModel"
import { fixUrl } from "../utils"
import {useRecoilState} from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"
import { useState } from 'react'

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

function del(id: string | null) {
  // prompt('Säker på att du vill radera denna hamster?')
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
        (<div className='cont'  onClick={() => del(prop.HamsterObj.uid)}>
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
        <p> hejhej</p>}

      </div>
  )
}
export default Card
