"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function AddRecipe(){

    const[title,setTile]=useState("");
    const[description,setDescritpion] = useState("");
    const[ingredients,setIngredients] = useState("");

    const router = useRouter();

    const handleSubmit = async(e) =>{

        e.preventDefault();

        if(!title || !description || !ingredients){
            alert("Title,description and ingredients are required.");
            return;
        }
        try{

           const res= await fetch('http://127.0.0.1:8000/POST/recipes',{
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({title,description,ingredients}),
            });
            console.log(res);

            if(res.ok){
                router.push("/");
            }else{
                throw new Error('Failed to create a topic');
            }

        }catch(error){
            console.log(error)

        }
    };


    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
            onChange={(e)=>setTile(e.target.value)}
            value={title}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Title"/>

            <input
            onChange={(e)=>setDescritpion(e.target.value)}
            value={description}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Description"/>

            <input
            onChange={(e)=>setIngredients(e.target.value)}
            value={ingredients}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Ingredients"/>

            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add recipe</button>
        </form>
    );
};