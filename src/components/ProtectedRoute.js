import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  // Si el usuario está autenticado, mostrar la ruta protegida
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
