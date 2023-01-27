import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const Header = () => {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated;
    const username = authContext.username
    const logout = authContext.logout;

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="https://github.com/TheWeKi">TheWeKi</a>

                <div className="container-fluid">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {isAuthenticated && <Link className="nav-link" to={`/welcome/${username}`}>Home</Link>}
                        </li>
                        <li className="nav-item">
                            {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                        </li>
                    </ul>
                </div>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                    </li>
                    <li className="nav-item">
                        {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                    </li>
                </ul>

            </nav>
        </div>
    )
}

export { Header }