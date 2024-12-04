import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Homepage from './homepage';
import Login from './login';
import './styling/App.css'

function App() {

  return (
    <Routes>
      <Route path='/home' element={<Homepage/>}/>
      <Route path='/browse' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
