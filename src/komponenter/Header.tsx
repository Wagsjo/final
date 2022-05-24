import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {


  return (
    <div>
      <header>
          <div className="h-left">
            <h1>
              <Link to="/" className="h-left-link"> Hamsterwars</Link>
            </h1>
          </div>
          <div className="h-middle">

          </div>
        <div className="h-right">
          <Link to="/fight" className="h-left-link">Tävla</Link>
          <Link to="/galleri" className="h-left-link">Galleri</Link>
        </div>
      </header>
    </div>
    )
}

export default Header
