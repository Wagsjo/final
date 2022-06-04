import { useEffect, useState, useRef } from "react"
import '../styles/Fight.css'
import {useRecoilValue, useRecoilState} from 'recoil'
import { hamsterObject } from "../AtomsAndModels/atoms"
import { Hamster } from "../AtomsAndModels/HamsterModel"
import { fixUrl } from "../utils"
import FightAfter from "./FightAfter"


const Fight = () => {
  const random = function() {
    return  Math.floor(Math.random() * hamsters.length)
  }

  const [hamsters, setHamster] = useRecoilState(hamsterObject)
  const [randomHamster, setRandomHamster] = useState(hamsters[random()])
  const [randomHamster2, setRandomHamster2] = useState(hamsters[random()])
  const [tempRandomHamster, setTempRandomHamster] = useState(randomHamster)
  const [tempRandomHamster2, setTempRandomHamster2] = useState(randomHamster2)
  const [vote, setVote] = useState(true)
  const [vote2, setVote2] = useState(true)
  const [info, showInfo] = useState(true)
  const [showHamster, setShowHamster] = useState(hamsters[random()])
  const isMounted = useRef(false)
  const previousValues = useRef({tempRandomHamster, tempRandomHamster2})
  const [allowedToFetchGet, setAllowedToFetchGet] = useState(false)
  const [allowedToFetchGet2, setAllowedToFetchGet2] = useState(true)


  useEffect(() => {
    if(vote === false && vote2 === true) {
      setShowHamster(randomHamster)
      let updatedValueH = {games: randomHamster.games+1, wins: randomHamster.wins+1};
      setTempRandomHamster(randomHamster => ({
        ...randomHamster, ...updatedValueH
      }))
      let updatedValueH2 = {games: randomHamster2.games+1, defeats: randomHamster2.defeats+1};
      setTempRandomHamster2(randomHamster2 => ({
        ...randomHamster2, ...updatedValueH2
      }))
    }
    if(vote2 === false && vote === true) {
      setShowHamster(randomHamster2)
      let updatedValueH2 = {games: randomHamster2.games+1, wins: randomHamster2.wins+1};
      let updatedValueH = {games: randomHamster.games+1, defeats: randomHamster.defeats+1};
      setTempRandomHamster(randomHamster => ({
        ...randomHamster, ...updatedValueH
      }))
      setTempRandomHamster2(randomHamster2 => ({
        ...randomHamster2, ...updatedValueH2
      }))
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
    {randomHamster.games}
    {randomHamster2.games}
    {vote && vote2 ? <h1>Tryck på den du tycker är sötast</h1> : ''}

      {vote && vote2 ?
      (<>
      <div className="fightCont">
        <div className="nameCont">
        </div>
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
