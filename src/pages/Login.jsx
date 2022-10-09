import React from 'react'
import { Link } from "react-router-dom"
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth"

export default function Login() {

    const handleGoogleLogin = ()=>{
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((result)=>{
            console.info(result.user)
        })
        .catch((err)=>{
            console.info(err)
        })
    }

    const handleCustomLogin = (e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(res =>{
            console.info(res)
        })
        .catch(err =>{
            console.error(err)
        })

    }

  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-blue-800 to-blue-500 max-w-[500px] mx-auto p-10'>
        <form className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6' autoComplete='off' onSubmit={handleCustomLogin}>
            <h1 className='text-4xl text-blue-500 text-center'>Login</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='mt-4 flex flex-col gap-2'>
                <button type='submit' className='h-10 w-full bg-blue-500 text-white rounded-lg'> Login </button>
                <button 
                    className='h-10 w-full bg-yellow-500 text-white rounded-lg' 
                    type='button' 
                    onClick={handleGoogleLogin}
                > 
                    Gunakan Google 
                </button>
                <Link to={'/register'} className='h-10 w-full bg-slate-500 text-white rounded-lg flex justify-center items-center'>       
                    Register 
                </Link>
            </div>

        </form>
    </main>
  )
}
