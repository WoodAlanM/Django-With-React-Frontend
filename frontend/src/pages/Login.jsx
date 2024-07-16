import { Link } from "react-router-dom"
import Form from "../components/Form"
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    return (
        <>
            <Form route="/api/token/" method="login" />
        </>
    )
        
}

export default Login