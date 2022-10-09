import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import "./firebase"
import { getAuth,onAuthStateChanged } from "firebase/auth"
import LoadingPage from './pages/LoadingPage'

export default function App() {

  const [isLogin,setIsLogin] = useState(false)
  const [isLoading ,setIsLoading] = useState(true)

  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth, (user)=>{
      if(user){
        localStorage.setItem('user', JSON.stringify(user))
        setIsLogin(true)
        setIsLoading(false)
        return
      }

      setIsLogin(false)
      setIsLoading(false)
      localStorage.clear()
    })
  },[])

  if(isLoading){
    return <LoadingPage />
  }

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
     
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Register />} />
        </Routes>
      )}
    </>
  )
}

