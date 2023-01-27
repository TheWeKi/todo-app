import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosApi } from "../api/apiService"
import { useAuth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

function Todos() {

    const authContext = useAuth()
    const username = authContext.username

    const [todos, setTodos] = useState([])

    const navigate = useNavigate();

    useEffect (
        () => refreshTodos(),
        // eslint-disable-next-line
        []
    )

    const refreshTodos = () => {
        retrieveAllTodosApi(username)
            .then( (response) => setTodos(response.data) )
            .catch( (e) => console.log(e) )
    }

    const deleteTodo = (id) => {
        deleteTodoApi(username, id)
            .then( (response) => refreshTodos() )
            .catch( (error) => console.log(error) )
    }

    const updateTodo = (id) => {
        navigate(`/todo/${id}`)
    }

    const addTodo = () => {
        navigate(`/todo/${-1}`)
    }

    return (
        <div className="container m-5 text-center">

            <h1> Your Todos </h1>
            <hr />

            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Target Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.targetDate}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={ () => deleteTodo(todo.id) }>
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success" onClick={ () => updateTodo(todo.id) }>
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                </tbody>
            </table>

            <div className="container">
                <button className="btn btn-success m-5 px-3 py-1" onClick={addTodo}>
                    Add A Todo
                </button>
            </div>

        </div>
    )
}

export { Todos }
