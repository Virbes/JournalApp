import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouter = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
}