import { useState, useEffect } from "react"
import '../styles/Home.css'
import { useRecoilValue, useRecoilState } from "recoil"
import { hamsterObject } from "../AtomsAndModels/atoms"
import { Hamster } from "../AtomsAndModels/HamsterModel"
import Card from "./Card"

const Home = () => {
  const hamsters = useRecoilValue (hamsterObject)
  const [cutest, setCutest] = useState<null | Hamster>(null)

  useEffect(() => {
    findCutest()
  }, [hamsters])

  function findCutest() {
    let temporaryCutest = hamsters[0]
    hamsters.forEach((h) => {
      if((h.wins - h.defeats) > (temporaryCutest.wins - temporaryCutest.defeats)) {
        temporaryCutest = h
      }
    })
    setCutest(temporaryCutest)
  }

  return (
    <div>
      <div className="pop-hamster">
        <h2>På Hamsterwars så tävlar hamstrar om vem som är sötast</h2>
      </div>
      <div className="pop-hamster">
        <h3>Den populäraste hamstern just nu: </h3>
      </div>
      <div className="container" >
        {cutest ? (
          <>

          <Card HamsterObj={cutest}></Card>
          </>) : 'No hamster to show right now'
        }
      </div>
    </div>
  )
}
export default Home
