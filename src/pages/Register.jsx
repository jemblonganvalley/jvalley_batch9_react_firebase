import React from 'react'
import {Link} from "react-router-dom"

export default function Register() {
  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-orange-800 to-orange-500 max-w-[500px] mx-auto p-10'>
        <form className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6' autoComplete='off'>
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
                <button className='h-10 w-full bg-orange-500 text-white rounded-lg'> Login </button>
                <button className='h-10 w-full bg-yellow-500 text-white rounded-lg'> Gunakan Google </button>
                <Link to={"/"} className='h-10 w-full bg-slate-500 text-white rounded-lg flex justify-center items-center'> Login </Link>
            </div>

        </form>
    </main>
  )
}
