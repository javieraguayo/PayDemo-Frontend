import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBar /> 
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 mt-4 text-red-600">Página No Encontrada</h1>
          <p className="text-gray-700 mt-4">
            Lo sentimos, la página que estás buscando no existe o la ruta no es válida.
          </p>

          <button
            onClick={() => navigate('/home')}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
