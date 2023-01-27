import { basicAuthCheck } from "../api/apiService"
import { clientUrl } from "../api/clientUrl"
import { context } from "./AuthContext"
import { useState } from "react"

const LoginContext = ( {children} ) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    const login = async (username, password) => {

        const token = 'Basic ' + window.btoa(username+':'+password)

        try {

            const response = await basicAuthCheck(token)

            if( response.status === 200 ) {
                setIsAuthenticated(true)
                setUsername(username)
                setToken(token)

                clientUrl.interceptors.request.use(
                    config => {
                        config.headers.Authorization = token
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
            
        } catch (error) {
            logout()
            return false
        }
         
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return (
        <context.Provider value={ {isAuthenticated, login, logout, username, token} } >
            { children }
        </context.Provider>
    )
}

export {LoginContext}