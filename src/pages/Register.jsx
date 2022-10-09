import React from 'react'
import {Link} from "react-router-dom"
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth"

export default function Register() {

    const handleGoogleLogin = ()=>{
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((result)=>{
            console.info(result.user)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    const handleGoogleRegister = (e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const password2 = e.target.password2.value

        if(!email || !password || !password2){
            return alert("silakan lengkapi data")
        }

        if(password !== password2){
            return alert("password harus sama")
        }

        if(password.length < 6){
            return alert("password harus lebih dari 6 karakter")
        }

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then((result)=>{
            localStorage.setItem('user', JSON.stringify(result.user))
        })
        .catch((err)=>{
            console.error(err)
        })
    }



  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-orange-800 to-orange-500 max-w-[500px] mx-auto p-10'>
        <form className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6' autoComplete='off' onSubmit={handleGoogleRegister}>
            <h1 className='text-4xl text-orange-500 text-center'>Register</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="password2">Ulangi Password</label>
                <input type="password" id='password2' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='mt-4 flex flex-col gap-2'>
                <button className='h-10 w-full bg-orange-500 text-white rounded-lg' type='submit'> Register </button>
                <button className='h-10 w-full bg-yellow-500 text-white rounded-lg' type='button' onClick={handleGoogleLogin}> Gunakan Google </button>
                <Link to={"/"} className='h-10 w-full bg-slate-500 text-white rounded-lg flex justify-center items-center'> Login </Link>
            </div>

        </form>
    </main>
  )
}
