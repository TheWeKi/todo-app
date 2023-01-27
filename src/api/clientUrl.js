import axios from "axios";

const clientUrl = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export {clientUrl}
