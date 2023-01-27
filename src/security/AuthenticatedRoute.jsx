
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ( props ) => {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated;

    if(isAuthenticated) return props.children 
    return <Navigate to='/' />
    
}

export {AuthenticatedRoute}
