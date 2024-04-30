"use client"

import { useRouter } from "next/navigation"
import { HiOutlineTrash } from "react-icons/hi"


export default function RemoveBtn({id}) {
    const router = useRouter()
    const HandleDelete = async() => {
       
            const confirmed = confirm('are you sure you want to delete?')
            if(confirmed){
                const res = await fetch(`http://localhost:3000/api/topics?id=${id}`,{
                    method: "DELETE"
                })
                if(res.ok){
                    console.log('deleted!')
                    router.replace('/');
                }
            }
    }
    return(
        <button className="text-red-400" onClick={HandleDelete}> 
            <HiOutlineTrash size={24}/>
        </button>
    )
}