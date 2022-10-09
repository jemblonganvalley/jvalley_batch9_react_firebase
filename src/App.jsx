import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { auth } from "./firebase"

export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

