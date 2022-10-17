import React, { useState, useEffect } from 'react'
import {getAuth, signOut} from "firebase/auth"
import { collection,getDocs, doc, setDoc, query, onSnapshot, orderBy, deleteDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"
import { db } from '../firebase'
import moment from 'moment'
import {AiOutlineDelete} from "react-icons/all"

export default function Dashboard() {

  // state
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [data,setData] = useState([])
  const navigate = useNavigate()

  // get data
  const getNotes = async()=>{
    let colData = await []
    let ref = await collection(db, "notes")
    let us = await JSON.parse(localStorage.getItem('user'))
    let q = await query(ref, orderBy("createdAt", "asc"))
    let querySnap = await getDocs(q)
    querySnap.forEach((e)=>{
      colData.push(e.data())
    })
    return colData
  }

  // store data 
  const storeData = async (data)=>{
    const ref = await doc(db, "notes", Date.now().toString())
    const insertNote = await setDoc(ref, data)
    return insertNote
  }

  // handle delete
  const handleDelete = (id)=>{
    const noteRef = doc(db, 'notes', `${id}`)
    console.info(id)
    deleteDoc(noteRef).then(res =>{console.info("Berhasil delete data")}).catch(err =>{console.error(err)})
  }

  // handle input
  const handleInputNote = (e)=>{
    e.preventDefault()
    storeData({
      author : user.email,
      note : e.target.note.value,
      createdAt : Date.now()
    }).then(res =>{
      e.target.note.value = ""
    })
  }

  // listener
  const listener = async()=>{
    let ref = await collection(db, "notes")
    let os = await onSnapshot(ref, (data)=>{
      console.info("ada perubahan")
      getNotes().then(res => {setData(res)})
    })
    return os
  }

  // clc
  useEffect(()=>{
    getNotes().then(res => {setData(res)})

    return ()=>{
      listener()
    }
  },[db])


  // logout function
  const handleLogout = ()=>{
    const auth = getAuth()
    signOut(auth)
    .then(result =>{
      localStorage.clear()
      navigate("/")
    })
    .catch((err)=>{
      console.error(err)
    })
  }

  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-red-800 to-red-500 max-w-[500px] mx-auto p-10'>

        <div className='w-full bg-white p-6 shadow-lg flex flex-col gap-4 items-center rounded-lg'>
            <h1 className='text-4xl text-red-500'>Welcome</h1>
            <img src={user?.photoURL} alt="" className='w-[80px] h-[80px] rounded-full object-cover' />
            <h3>{user?.email}</h3>

            <button className='h-10 bg-black text-white rounded-lg w-full' onClick={handleLogout}>
                logout
            </button>
        </div>

        <form className='w-full p-6 flex flex-col gap-4 bg-white shadow-lg rounded-md mt-4' onSubmit={handleInputNote}>
          <div className='flex flex-col gap-2'>
            <label htmlFor="note">Note</label>
            <textarea id='note' className='w-full p-3 border-[1px] border-gray-300'></textarea>
          </div>
          <button className='w-20 bg-orange-500 text-white rounded-md h-10'>submit</button>
        </form>

        {data.length > 0 && (
          <div className='p-6 flex flex-col-reverse bg-white rounded-lg mt-4 gap-2'>
          {data.map((e, i)=>(
            <div className='w-full flex flex-col h-32 p-4 justify-center text-ellipsis bg-gray-50 relative' key={i}>
              <h1>{e.note}</h1>
              <div className='mt-auto flex flex-col'>
                <small className='italic text-xs text-gray-400'>{e.author}</small>
                <small className='italic text-xs text-gray-400'>{moment(e.createdAt).format("dddd DD/MM/YYYY hh:mm")}</small>
              </div>
              <div className='absolute top-2 right-2'>
                <button onClick={()=>{
                  handleDelete(e.createdAt)
                }}>
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

    </main>
  )
}
