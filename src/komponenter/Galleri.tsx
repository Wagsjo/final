import { useState, useEffect } from "react"
import '../styles/Galleri.css'
import Card from './Card'
import { Hamster } from "../AtomsAndModels/HamsterModel"
import AddHamster from './AddHamster'
import { useRecoilValue } from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"
const Galleri = () => {

  const [oneHamster, setHamster] = useRecoilValue(hamsterObject)

/*   const [data, addData] = useState<null | Hamster>(null) */
/*   const fetchURL = 'http://localhost:1234/hamsters'
  useEffect(() => {
    fetch(fetchURL)
    .then(asd => asd.json())
    .then(show => setHamster(show))
  }, []) */

  return (
    <div className="card-container">
        <AddHamster></AddHamster>
    </div>
  )
}
export default Galleri
