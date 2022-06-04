import { Hamster } from "../AtomsAndModels/PostHamster";
import { useEffect, useState } from "react";
import { fixUrl } from "../utils";
import '../styles/AddHamsters.css'

const AddHamster = () => {
  const [age, changeAge] = useState<string | null>(null)
  const [favFood, changeFavFood] = useState<string | null>(null)
  const [loves, changeLoves] = useState<string | null>(null)
  const [name, changeName] = useState<string | null>(null)
  const [img, changeImg] = useState<string | null>(null)

  let HamsterObject: Hamster = {
    age: Number(age),
    defeats: 0,
    favFood: favFood,
    games: 0,
    imgName: 'hamster-2.jpg',
    loves: loves,
    name: name,
    wins: 0,
  }
  useEffect(() => {
    if(Number(age) > 0) {

    }
  }, [age])

  function sendHamster() {
    fetch(fixUrl('/hamsters'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(HamsterObject)
    })
  }

  return (
    <div className="add-container">
      <h1>Ladda upp en ny hamster här.</h1>
      <h4>When you add a new hamster, it automatically get 0 wins, 0 defeats.</h4>
      <input type="text" placeholder="Ålder i år" onChange={e => changeAge(e.target.value)}/>
      <input type="text" placeholder="Favoritmat" onChange={e => changeFavFood(e.target.value)}/>
      <input type="text" placeholder="Älskar att" id="" onChange={e => changeLoves(e.target.value)}/>
      <input type="text" placeholder="Namn" id="" onChange={e => changeName(e.target.value)}/>
      {/* <input type="text" placeholder="Bild" id="" onChange={e => changeImg(e.target.value)}/> */}
      <button disabled={!validate} onClick={sendHamster}>Skicka in</button>
    </div>
  )
}
export default AddHamster
