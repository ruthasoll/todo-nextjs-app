"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddTopic() {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [error,setError] = useState([])
    
    const router = useRouter()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!title || !description){
            alert('title and description are required')
            return
        }
        try {
            const res = await fetch('/api/topics',{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    title,
                    description
                }),
                
    
            })
            
            if(res.ok){
                router.push('/')
            } else{
                throw new Error('failed tp create a topic')
            }
            const {msg} = await res.json();
        //set title and description to empty string
        setTitle("")
        setDescription('')
        setError(msg)
        } catch (error) {
            console.log(error)
        }
        
        
        console.log(error)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={e=>setTitle(e.target.value)} value={title} className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Title" name="title"></input>
            <input onChange={e=>setDescription(e.target.value)} value={description} className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Description" name="description"></input>
            <button onClick={handleSubmit} type='submit' className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add Topic</button>
        </form>
    )
}