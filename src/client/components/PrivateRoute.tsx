import * as React from 'react'
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }: PrivateRouteProps) => {

    
    const TOKEN = localStorage.getItem('token');

    if (!TOKEN) {
        return <Navigate to ='/login' />
    } else {
        return <>{children}</>;
    }
};

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default PrivateRoute