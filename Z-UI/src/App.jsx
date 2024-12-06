import React, { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Homepage from './homepage';
import Profile from './Profile';
import Browse from './Browse';
import Create from './Create';
import Login from './login';
import Info from './info';
import './styling/App.css'

export const SelectedInfo = React.createContext();
export const DetailsContext = React.createContext();

function App() {

  const [details, setDetails] = useState({})
  const value = { details, setDetails }

  const [info, setInfo] = useState([{album_id: 2}]);
  const information = { info, setInfo }

  return (
    <DetailsContext.Provider value={value}>
      <SelectedInfo.Provider value={information}>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/info' element={<Info/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </SelectedInfo.Provider>
    </DetailsContext.Provider>
  )
}

export default App
