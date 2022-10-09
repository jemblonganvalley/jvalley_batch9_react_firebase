import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { auth } from "./firebase"
import { getAuth,onAuthStateChanged } from "firebase/auth"

export default function App() {

  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth, (user)=>{
      if(user){
        console.info(user)
        return
      }
    })
  },[])

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

