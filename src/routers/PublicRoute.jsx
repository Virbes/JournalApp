import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRouter = ({ isAuthenticated }) => {
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}