import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/sidebar.css";
import api from "../api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Recipe from "./Recipe";

function Sidebar({ onCreateRecipe }) {
    const [username, setUserName] = useState("");

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const createRecipe = () => {
        api.post("/api/recipes/", { content, title }).then((res) => {
            if (res.status === 201) {
                console.log("Recipe created");
            }
            else {
                alert("Failed to make recipe.");
                console.log("Failed to create recipe.")
            }
        }).catch((err) => alert(err));
        setTitle("");
        setContent("");
    };

    useEffect(() => {
        getUsername();
    }, []);

    const getUsername = () => {
        api.
            get("/api/get-username/")
            .then((res) => { setUserName(res.data.username) })
            .catch((err) => alert(err))
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const toggleAndSave = () => {
        setModal(!modal);
        createRecipe();
        onCreateRecipe();
    };

    return (
        <>
            <div className="sidebar">
                <div className="container">
                    <h1 className="text-center">{username}</h1>
                    <br />
                    <Button className="mt-2 w-100" color="primary" onClick={toggle}>
                        Create New Recipe
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>
                            Create a new recipe:
                        </ModalHeader>
                        <ModalBody>
                            <label htmlFor="title">Recipe Title:</label>
                            <br />
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                onChange={handleTitleChange}
                                value={title}
                            />
                            <br />
                            <label htmlFor="content">Directions:</label>
                            <br />
                            <textarea
                                id="content"
                                name="content"
                                required
                                value={content}
                                onChange={handleContentChange}
                            ></textarea>
                            <ul className="ingredientList"></ul>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggleAndSave}>
                                Save Recipe
                            </Button>
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Sidebar;