import '../styles/Galleri.css'
import Card from './Card'
import AddHamster from './AddHamster'
import { useRecoilValue } from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"

const Galleri = () => {

  const hamster = useRecoilValue(hamsterObject)

  return (
    <div className="card-container">
    <p id="click-this">Klicka på en hamster för att ta bort den</p>
      {hamster ? hamster.map(h => (
        <Card HamsterObj={h} key={h.uid}></Card>
      )) : 'Hamstern/ hamstrarna kan inte nås just nu.'}
        <AddHamster></AddHamster>
    </div>
  )
}
export default Galleri
