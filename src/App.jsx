import { useRef, useState, useEffect } from "react";

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ColdPlunge from "./articles/coldplunge/ColdPlunge";
import Week1 from "./articles/Week1";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/cold-plunge" element={<ColdPlunge />} />
        <Route path="/articles/week-1" element={<Week1 />} />
      </Routes>
    </div>
  )
}

export default App
