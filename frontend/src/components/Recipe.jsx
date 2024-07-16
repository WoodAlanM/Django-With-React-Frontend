import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Recipe({ recipe, onDelete }) {
    const formattedDate = new Date(recipe.created_at).toLocaleDateString("en-US")

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="recipe-title">{recipe.title}</h5>
                    <p className="recipe-content">{recipe.content}</p>
                    <p className="recipe-date">{formattedDate}</p>
                    <a href="#" className="btn btn-primary" onClick={() => onDelete(recipe.id)}>Delete Recipe</a>
                </div>
            </div>
        </>
    );
}

export default Recipe