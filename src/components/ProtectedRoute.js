// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({ element }) => {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
