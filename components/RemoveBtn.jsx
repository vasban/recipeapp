'use client';

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }){
    const router = useRouter();
    const removeRecipe = async() =>{
        const confirmed = confirm("Are you sure?");

        if(confirmed){
            await fetch(`http://127.0.0.1:8000/DELETE/recipes/${id}`,{
                method:"POST",}
            )
        }
        router.refresh();
    }
    
    return (
        <button onClick={removeRecipe} className="text-red-600">
            <HiOutlineTrash size={24} />
        </button>);
}