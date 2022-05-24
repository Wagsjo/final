import { useState } from "react"
import '../styles/Fight.css'
import Card from './Card'
import {useRecoilValue} from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"
import { Hamster } from "../AtomsAndModels/HamsterModel"
import { fixUrl } from "../utils"


const Fight = () => {
  const hamsters = useRecoilValue(hamsterObject)

  const random = function() {
    return  Math.floor(Math.random() * hamsters.length)
  }
  let randomHamster = hamsters[random()]
  let randomHamster2 = hamsters[random()]

  function element() {
    return (
    <>
    <p> {randomHamster.name} </p>
    <img src={fixUrl('/img/hamster-1')} alt="" />
    </>
    )
  }
  function element2() {
    return <p> {randomHamster2.name} </p>
  }


  return (

    <>
      {element()}
      {element2()}
    </>
  )
}
export default Fight
