import { Hamster } from "../AtomsAndModels/PostHamster";
import { useEffect, useState } from "react";
import { fixUrl } from "../utils";
import { useRecoilState } from "recoil";
import '../styles/AddHamsters.css'
import { hamsterObject } from "../AtomsAndModels/atoms"

const AddHamster = () => {
  const [age, changeAge] = useState<string | null>(null)
  const [favFood, changeFavFood] = useState<string | null>(null)
  const [loves, changeLoves] = useState<string | null>(null)
  const [name, changeName] = useState<string | null>(null)
  const [message, changeMessage] = useState<string>('')
  const [hamsters, setHamsters] = useRecoilState(hamsterObject)

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
    if(Number(age) < 0) {
      changeMessage('En hamsters ålder måste minst vara 0')
    }
    if(Number(age) > 9) {
      changeMessage('Hamstrar blir inte så gamla')
    }
    if(isNaN(Number(age))) {
      changeMessage('Skriv en siffra')
    }
  }, [age])

  function sendHamster() {
    if(age !== null && favFood !== null && loves !== null && name !== null) {
      fetch(fixUrl('/hamsters'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(HamsterObject)
      })
      .then(res => {if(res.ok) {
        fetch(fixUrl('/hamsters'))
        .then(h => h.json())
        .then(hams => setHamsters(hams))
      }} )
    } else {
      changeMessage('Fyll i fullständig information.')
    }

  }

  return (
    <div className="add-container">
      <h1>Ladda upp en ny hamster här.</h1>
      <div className="messageCont">
        <p> {message} </p>
      </div>
      <input type="text" placeholder="Ålder(år)" onChange={e => changeAge(e.target.value)}/>
      <input type="text" placeholder="Favoritmat" onChange={e => changeFavFood(e.target.value)}/>
      <input type="text" placeholder="Älskar att" id="" onChange={e => changeLoves(e.target.value)}/>
      <input type="text" placeholder="Namn" id="" onChange={e => changeName(e.target.value)}/>
      <button onClick={sendHamster}>Skicka in</button>

    </div>
  )
}
export default AddHamster
