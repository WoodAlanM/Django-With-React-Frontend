import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/form.css"
import React from "react";
import { Link } from "react-router-dom";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    var content;

    if (method === "login") {
        content = <Link to="/register" className="btn btn-warning">New account</Link>;
    } else {
        content = <Link to="/login" className="btn btn-warning">Login</Link>;
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="container position-relative">
                <form onSubmit={handleSubmit} className="position-absolute start-50 translate-middle-x">
                    <h1 id="method" className="mt-3">{method}</h1>
                    <div className="mt-3 mb-3">
                        <input
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button className="position-absolute end-0 btn btn-primary" type="submit">
                        {method}
                    </button>
                    <div className="position-absolute start-50 translate-middle-x w-100">{content}</div>
                </form>

            </div>
        </>
    );
}

export default Form