import { useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isAuthorized, setIsAuthorize] = useState(true)

    const navigate = useNavigate()

    const authContext = useAuth()

    const gotoWelcomePage = async () => {
        if( await authContext.login(username, password) )
            navigate(`/welcome/${username}`)
        setIsAuthorize(false)
    }

    return (
        <div className="container text-center">
            <h3 className="md-3"> Enter Credentials </h3>
            <hr />

            { !isAuthorized && <p className="text-warning">Wrong Credential</p> }

            <div className="container">
                <label htmlFor="username" className="me-5">Username </label>
                <input type="text" name="username" value={username} onChange={ e => setUsername(e.target.value) } />
                <br /><br />
                <label htmlFor="password" className="me-5">Password </label>
                <input type="text" name="password" value={password} onChange={ e => setPassword(e.target.value) } />
                <br /><br />
                <button className="btn btn-success" onClick={gotoWelcomePage}> Login </button>
            </div>
        </div>
    )
}

export { Login }
