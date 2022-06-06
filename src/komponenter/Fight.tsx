import { useEffect, useState, useRef } from "react"
import '../styles/Fight.css'
import { useRecoilState } from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"
import { fixUrl } from "../utils"
import FightAfter from "./FightAfter"
import { Hamster } from "../AtomsAndModels/HamsterModel"

const Fight = () => {
  const random = function() {
    return  Math.floor(Math.random() * hamsters.length)
  }

  const [hamsters, setHamster] = useRecoilState(hamsterObject)
  const [randomHamster, setRandomHamster] = useState<Hamster>(hamsters[random()])
  const [randomHamster2, setRandomHamster2] = useState<Hamster>(hamsters[random()])
  const [tempRandomHamster, setTempRandomHamster] = useState<Hamster>(randomHamster)
  const [tempRandomHamster2, setTempRandomHamster2] = useState<Hamster>(randomHamster2)
  const [vote, setVote] = useState<boolean>(true)
  const [vote2, setVote2] = useState<boolean>(true)
  const [info, showInfo] = useState<boolean>(true)
  const [showHamster, setShowHamster] = useState<Hamster>(hamsters[random()])
  const isMounted = useRef<boolean>(false)
  const previousValues = useRef({tempRandomHamster, tempRandomHamster2})
  const [allowedToFetchGet, setAllowedToFetchGet] = useState<boolean>(false)
  const [allowedToFetchGet2, setAllowedToFetchGet2] = useState<boolean>(true)


  useEffect(() => {
    if(vote === false && vote2 === true) {
      setShowHamster(randomHamster)
      setTempRandomHamster({games: randomHamster.games+1, age: randomHamster.age, name: randomHamster.name, wins: randomHamster.wins+1, defeats: randomHamster.defeats, uid: randomHamster.uid, favFood: randomHamster.favFood, loves: randomHamster.loves, imgName: randomHamster.imgName })
      setTempRandomHamster2({games: randomHamster2.games+1, age: randomHamster2.age, name: randomHamster2.name, wins: randomHamster2.wins, defeats: randomHamster2.defeats+1, uid: randomHamster2.uid, favFood: randomHamster2.favFood, loves: randomHamster2.loves, imgName: randomHamster2.imgName })
    }
    if(vote2 === false && vote === true) {
      setShowHamster(randomHamster2)
      setTempRandomHamster({games: randomHamster.games+1, age: randomHamster.age, name: randomHamster.name, wins: randomHamster.wins, defeats: randomHamster.defeats+1, uid: randomHamster.uid, favFood: randomHamster.favFood, loves: randomHamster.loves, imgName: randomHamster.imgName })
      setTempRandomHamster2({games: randomHamster2.games+1, age: randomHamster2.age, name: randomHamster2.name, wins: randomHamster2.wins+1, defeats: randomHamster2.defeats, uid: randomHamster2.uid, favFood: randomHamster2.favFood, loves: randomHamster2.loves, imgName: randomHamster2.imgName })
    }
  }, [vote, vote2])


  useEffect(() => {
    if(isMounted.current
      && previousValues.current.tempRandomHamster !== tempRandomHamster
      && previousValues.current.tempRandomHamster2 !== tempRandomHamster2
      && vote == false || vote2 == false) {
      fetch(fixUrl(`/hamsters/${tempRandomHamster.uid}`), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempRandomHamster)
    })
    .then(() => {
      setAllowedToFetchGet(!allowedToFetchGet)
    })

    fetch(fixUrl(`/hamsters/${tempRandomHamster2.uid}`), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempRandomHamster2)
    })
    .then(() => {
      setAllowedToFetchGet2(!allowedToFetchGet2)
    })
  } else {
    isMounted.current = true
  }
}, [tempRandomHamster2, tempRandomHamster])

  useEffect(() => {
    if( isMounted.current && allowedToFetchGet !== allowedToFetchGet2 ) {
      fetch(fixUrl('/hamsters'))
      .then(asd => asd.json())
      .then(show => {
        console.log(show)
        setHamster(show)
      })
    }
  }, [allowedToFetchGet, allowedToFetchGet2])

  useEffect(() => {
    if(vote === false || vote2 === false) {
    console.log(hamsters)
      setRandomHamster(hamsters[random()])
      setRandomHamster2(hamsters[random()])
      setVote(true)
      setVote2(true)
    }
  }, [info])



  return (
    <>
    {vote && vote2 ? <h1>Tryck på den du tycker är sötast</h1> : ''}

      {vote && vote2 ?
      (<>
      <div className="fightCont">
        <div className="hamsterCont">
          <h3>{randomHamster.name}</h3>
          <img src={fixUrl('/img/' + randomHamster.imgName)} alt="" onClick={() => setVote(false)} />
        </div>
        <div className="hamsterCont">
          <h3>{randomHamster2.name}</h3>
          <img src={fixUrl('/img/' + randomHamster2.imgName)} alt="" onClick={() => setVote2(false)} />
        </div>


      </div>
      </>) :
      (<>
      <FightAfter winningHamster={showHamster}></FightAfter>
      <div className="buttonCont"><button id="playAgainBtn" onClick={() => showInfo(!info)}>Nästa match</button></div>
      </>)}
    </>
  )
}
export default Fight
