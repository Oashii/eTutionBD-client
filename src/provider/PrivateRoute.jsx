import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation} from 'react-router';
import Loading from '../components/Loading'

const PrivateRoute = ({children, requiredRole = null}) => {
    const {user, loading} = use(AuthContext);

    const location = useLocation();

    if(loading){
        return <Loading></Loading>;
    }

    if(user && user?.email){
        // If a specific role is required, check if user has that role
        if (requiredRole && user?.role !== requiredRole) {
            return <Navigate to='/login' />;
        }
        return children;
    }

    return <Navigate state={location.pathname} to='/login'>

    </Navigate>
};

export default PrivateRoute;