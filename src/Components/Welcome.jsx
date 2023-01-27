
import { useNavigate, useParams } from 'react-router-dom'

function Welcome() {

    const {username} = useParams()
    const navigate = useNavigate()

    const gotoTodosPage = () => {
        navigate(`/todos`)
    }

    return (
        <div className="container-fluid text-center">
            <h1>Welcome {username}</h1> <hr />
            <h2> Manage Your Todos 
                <br />
                <button className='btn btn-primary m-5 p-3' onClick={gotoTodosPage}> Manage </button>
            </h2>
        </div>
    )
}

export { Welcome }
