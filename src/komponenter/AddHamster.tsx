import { Hamster } from "../AtomsAndModels/HamsterModel";
import { useState } from "react";
import { fixUrl } from "../utils";

const AddHamster = () => {
  const [age, changeAge] = useState<String | null>(null)
  const [favFood, changeFavFood] = useState<String | null>(null)
  const [loves, changeLoves] = useState<String | null>(null)
  const [name, changeName] = useState<String | null>(null)
  const [img, changeImg] = useState<String | null>(null)

  // const HamsterObject: Hamster = {
  //   age: Number(age),
  //   defeats: 0,
  //   favFood: favFood,
  //   games: 0,
  //   imgName: img,
  //   loves: loves,
  //   name: name,
  //   uid: null,
  //   wins: 0,
  // }

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
    <div className="add container">
      <input type="text" placeholder="Ålder" id="" onChange={e => changeAge(e.target.value)}/>
      <input type="text" placeholder="Favoritmat" id="" onChange={e => changeFavFood(e.target.value)}/>
      <input type="text" placeholder="Gillar" id="" onChange={e => changeLoves(e.target.value)}/>
      <input type="text" placeholder="Namn" id="" onChange={e => changeName(e.target.value)}/>
      <input type="text" placeholder="Bild" id="" onChange={e => changeImg(e.target.value)}/>
      <button onClick={sendHamster}>Skicka in</button>
    </div>
  )
}
export default AddHamster
