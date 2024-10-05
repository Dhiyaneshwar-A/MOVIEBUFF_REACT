import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/index';

const AdminRoute = ({ element }) => {
  const { userLoggedIn, isAdmin } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!userLoggedIn) {
    return <Navigate to="/" />;
  }

  // If the user is logged in but not an admin, redirect to the home route
  if (!isAdmin) {
    return <Navigate to="/home" />;
  }

  // If the user is an admin, render the passed element
  return element;
};

export default AdminRoute;
