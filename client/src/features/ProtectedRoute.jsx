import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const { userId } = useSelector((state) => state.user)
    if (!userId) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
