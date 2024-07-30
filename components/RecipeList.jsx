import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import React from "react";

const getRecipes = async()=> {
    try{
       const res= await fetch(
            'http://127.0.0.1:8000/GET/recipes',
            {cache: "no-store"},
        )

        if(!res.ok){
            throw new Error("Failed to fetch data")
        }
        return res.json();

    }catch(error){
        console.log("Error loading recipes: ",error)
    }
}


 export default async function RecipeList(){

    const{recipes} = await getRecipes();

    return (
        <>
        {recipes.map((r)=>(
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                <div key="Info">
                    <h2 className="font-bold test-2xl">{r.title}</h2>
                    <div>{r.description}</div>
                </div>
                <div key="options" className="flex gap-2">
                    <RemoveBtn id={r.id} />
                    <Link href={`/editRecipe/${r.id}`}>
                        <HiPencilAlt size={24}/>
                    </ Link>
                </div>
            </div>
        ))}
        </>
    )
}