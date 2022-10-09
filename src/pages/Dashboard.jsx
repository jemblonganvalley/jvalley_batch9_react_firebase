import React from 'react'

export default function Dashboard() {
  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-red-800 to-red-500 max-w-[500px] mx-auto p-10'>

        <div className='w-full bg-white p-6 shadow-lg flex flex-col gap-4 items-center rounded-lg'>
            <h1 className='text-4xl text-red-500'>Welcome</h1>
            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='w-[80px] h-[80px] rounded-full object-cover' />
            <h3>fadliselaz@gmail.com</h3>

            <button className='h-10 bg-black text-white rounded-lg w-full'>
                logout
            </button>
        </div>

    </main>
  )
}
