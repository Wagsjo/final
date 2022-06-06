import '../styles/Fight.css'
import { Hamster } from "../AtomsAndModels/HamsterModel"
import { fixUrl } from "../utils"

interface Props {
  winningHamster: Hamster;
}
const FightAfter = (prop: Props) => {

  return (
  <>
  <div className="headline">
    <h1 >Kul att du du gillar {prop.winningHamster.name}</h1>
  </div>
    <div className="fightAfterCont">
      <img src={fixUrl('/img/' + prop.winningHamster.imgName)}></img>
      <ul>
        <li><h4>{prop.winningHamster.age} år gammal</h4></li>
        <li><h4>Antal vunna röster: {prop.winningHamster.wins+1} </h4></li>
        <li><h4>Antal förlorade röster: {prop.winningHamster.defeats}</h4></li>
        <li><h4>Antal matcher: {prop.winningHamster.games+1}</h4></li>
        <li><h4>Äter helst {prop.winningHamster.favFood}</h4></li>
        <li><h4>Älskar att {prop.winningHamster.loves}</h4></li>
        <li><h4>ID: {prop.winningHamster.uid}</h4></li>
      </ul>


    </div>
    </>
  )
}
export default FightAfter
