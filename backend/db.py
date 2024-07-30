from fastapi import FastAPI,Depends
from pydantic import BaseModel
from sqlalchemy import create_engine,Column,Integer,String,Text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

#FastAPI
app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Sqlalchemy

engine = create_engine("sqlite:///db.sqlite",connect_args={"check_same_thread":False})
SessionLocal = sessionmaker(engine)
Base = declarative_base()

class Recipes(Base):
    __tablename__ = "Recipes"
    id = Column(Integer,primary_key=True)
    title = Column(String,index=True)
    description = Column(Text)
    ingredients = Column(String)


        


def init_db():
   Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Pydantic
class RecipeBase(BaseModel):
    title:str
    description:str
    ingredients:str

#FastAPI
@app.get('/GET/recipes')
async def get_recipes(db:Session = Depends(get_db)):
    results = db.query(Recipes).all()
    return {"recipes" : results}
#    
@app.get('/GET/recipes/{id}')
async def get_recipe(id:int,db:Session=Depends(get_db)):
    result = db.query(Recipes).get(id)
    return {"recipes ":result}
@app.post('/POST/recipes')
async def post_recipe(recipe:RecipeBase,db:Session=Depends(get_db)):
    recipe_data = Recipes(title=recipe.title,description=recipe.description,ingredients=recipe.ingredients)
    db.add(recipe_data)
    db.commit()
    db.refresh(recipe_data)
    return recipe_data
@app.post('/PUT/recipes/{id}')
async def put_recipe(id:int,recipe:RecipeBase,db:Session=Depends(get_db)):
    new_recipe = db.query(Recipes).get(id)
    new_recipe.title = recipe.title
    new_recipe.ingredients = recipe.ingredients
    new_recipe.description = recipe.description
    db.commit()

@app.post('/DELETE/recipes/{id}')
async def delete_recipe(id:int,db:Session=Depends(get_db)):
    query = db.query(Recipes).where(Recipes.id == id)
    query.delete()
    db.commit()