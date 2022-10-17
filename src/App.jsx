import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { auth, messaging } from "./firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getToken } from "firebase/messaging";



export default function App() {

  // state
  const [isLogin, setIsLogin] = useState(false)
  const [loading,setLoading] = useState(true)

  //get notification
  const notifPermission = ()=>{
    Notification.requestPermission()
    .then((per)=>{
      if(per == "granted"){
        return console.info("Permission diizinkan")
      }
      console.info("Tidak di izinkan")
    })
  }

  // get token
  const getFCMToken = ()=>{
    getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        console.info(currentToken)
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }

  // clc
  useEffect(()=>{
    notifPermission()
    getFCMToken()
    const auth = getAuth()
    onAuthStateChanged(auth, (result)=>{
      if(result){
        setIsLogin(true)
        setLoading(false)
        return
      }

      setIsLogin(false)
      setLoading(false)
    })

  },[])

  if(loading){
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center'> 
        Loading.. 
      </div>
    )
  }

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
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

