import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {fixUrl} from './utils'
import { useRecoilState } from 'recoil'
import { hamsterObject } from './AtomsAndModels/atoms'
import './App.css'
import Header from './komponenter/Header'
import Fight from './komponenter/Fight'
import Galleri from './komponenter/Galleri'
import Home from './komponenter/Home'

function App() {

  const [hamster, setHamster] = useRecoilState(hamsterObject)

    useEffect(() => {
    fetch(fixUrl('/hamsters'))
    .then(asd => asd.json())
    .then(show => {
      setHamster(show)
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Header></Header>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fight" element={ <Fight />} />
            <Route path="/galleri" element={ <Galleri /> } />
          </Routes>
        </div>
        <main>
        </main>
      </div>
    </Router>
  )
}

export default App
