"use client";
import{useState} from "react";
import{useRouter} from "next/navigation"



export default function EditRecipeForm(id,title,description,ingredients){

    const[newTitle,setNewTitle] = useState(title);
    const[newDescription,setNewDescription] = useState(description);
    const[newIngredients,setNewIngredients] = useState(ingredients);
    
    const router = useRouter();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const res = await fetch(`http://127.0.0.1:8000/PUT/recipes/${id}`,{
                method: "PUT",
                headers:{
                    "Content-type":"application/json",
                },
                body: JSON.stringify({newTitle,newDescription,newIngredients}),
            });

            if(!res.ok){
                throw new Error("Failed to updatte topic");
            }

            router.refresh();
            router.push('/');
        }catch(error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
            onChange={(e)=>setNewTitle(e.target.value)}
            value={newTitle}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Title"/>

            <input
            onChange={(e)=>setNewDescription(e.target.value)}
            value={newDescription}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Description"/>

            <input 
            onChange={(e)=>setNewIngredients(e.target.value)}
            value={newIngredients}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Ingredients"/>

            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Update recipe</button>
        </form>
    );
}