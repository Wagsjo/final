import { useState, useEffect } from "react"
import '../styles/Home.css'
import { useRecoilValue } from "recoil"
import { hamsterObject } from "../AtomsAndModels/atoms"
import { Hamster } from "../AtomsAndModels/HamsterModel"

const Home = () => {
  let hamsters = useRecoilValue (hamsterObject)
  const [cutest, setCutest] = useState()

  function findCutest() {
    let temporaryCutest = hamsters[0]
    hamsters.forEach((h) => {
      if(h.wins > temporaryCutest.wins) {
        console.log(h)
      }
    })
  }
  findCutest()
  return (
    <div>
      <button >Visa den sötaste hamstern</button>
      <div className="container" >
        <div className="popular">

        </div>
      </div>
    </div>
  )
}
export default Home
