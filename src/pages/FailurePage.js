import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle } from 'lucide-react'; // Icono de círculo con una "X"

function FailurePage() {
  const location = useLocation();
  const { reason } = location.state || { reason: 'Razón desconocida' };
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Transacción Fallida</h1>
        <p className="mt-1 text-gray-600">{reason}</p>

        <button
          onClick={() => navigate('/payment')}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}

export default FailurePage;
