import React, { use } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user,loading} = use(AuthContext)
    const location = useLocation();

     if (loading) {
        return <span className="loading loading-spinner text-success"></span>
    }

    if (user) {
        return children;
    }
    return (
        <Navigate state={location?.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoute;