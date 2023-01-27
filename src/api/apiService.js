import { clientUrl } from "./clientUrl";


const basicAuthCheck = (token) => clientUrl.get('/basic-auth-check', {
    headers: {
        Authorization: token
    }
})


const retrieveAllTodosApi = (username) => clientUrl.get(`/users/${username}/todos`)

const deleteTodoApi = (username, id) => clientUrl.delete(`/users/${username}/todos/${id}`)

const retrieveTodoApi = (username, id) => clientUrl.get(`/users/${username}/todos/${id}`)

const updateTodoApi = (username, id, todo) => clientUrl.put(`/users/${username}/todos/${id}`, todo)

const createTodoApi = (username, todo) => clientUrl.post(`/users/${username}/todos`, todo)

export { retrieveAllTodosApi, deleteTodoApi, retrieveTodoApi, updateTodoApi, createTodoApi, basicAuthCheck }
