import EditRecipeForm from"@/components/EditRecipeForm"

const getRecipeById = async(id) =>{
    try{
        const res = await fetch(`http://127.0.0.1:8000/GET/recipes/${id}`,
        {cache:"no-store",});

        if(!res.ok){
            throw new Error("Failed to fetch topic");
        }
        console.log("Response recieved: ",res)
        return res.json();
    }catch{
        console.log(error);
    }
};

export default async function EditRecipe({params}){
    const{id} = params;
    console.log(id);
    const {recipes} =await getRecipeById(id);
    const {ingridients,title,description} = recipes;

    return <EditRecipeForm id={id} title={title} description={description} ingridients={ingridients} />;
}