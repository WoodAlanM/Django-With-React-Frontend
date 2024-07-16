import { useState, useEffect } from "react"
import api from "../api"
import Recipe from "../components/Recipe"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Sidebar from "../components/Sidebar";
import "../styles/home.css"


function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes();
    }, []);

    const rerenderRecipes = () => {
        console.log("re render called")
        getRecipes();
    };

    const getRecipes = () => {
        api
            .get("api/recipes/")
            .then((res) => res.data)
            .then((data) => setRecipes(data))
            .catch((err) => alert(err));
    };

    const deleteRecipe = (id) => {
        api.delete(`/api/recipes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Recipe deleted.");
            else alert("Failed to delete note.");
            getRecipes();
        }).catch((error) => alert(error));
    };

    return (
        <>
            <div className="app">
                <Sidebar onCreateRecipe={rerenderRecipes} />
                <div className="homeContent">
                    <div>
                        <h1>Recipes</h1>
                        <div className="recipe-grid">
                            {recipes.map((recipe) =>
                                <Recipe recipe={recipe} onDelete={deleteRecipe} key={recipe.id} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home