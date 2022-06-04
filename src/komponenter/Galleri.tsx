import { useState, useEffect } from "react"
import '../styles/Galleri.css'
import Card from './Card'
import { Hamster } from "../AtomsAndModels/HamsterModel"
import AddHamster from './AddHamster'
import { useRecoilValue } from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"

const Galleri = () => {

  const hamster = useRecoilValue(hamsterObject)
  console.log(hamster)

  return (
    <div className="card-container">
      {hamster ? hamster.map(h => (
        <Card HamsterObj={h} key={h.name}></Card>
      )) : 'Hamstern/ hamstrarna kan inte nås just nu.'}
        <AddHamster></AddHamster>
    </div>
  )
}
export default Galleri
