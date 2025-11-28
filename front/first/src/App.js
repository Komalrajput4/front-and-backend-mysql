import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './User'
import Login from './Login'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/User' element={<User></User>}></Route>


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
