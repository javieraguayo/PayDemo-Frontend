import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle } from 'lucide-react';

function FailurePage() {
  const location = useLocation();
  let { reason } = location.state || { reason: 'Razón desconocida' };

  if (!Array.isArray(reason)) {
    reason = [reason];
  }

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Transacción Fallida</h1>
        
        {/* Mostrar las razones de la transacción fallida */}
        <div className="mt-4 text-gray-600">
          <ul>
            {reason.map((r, index) => (
              <li key={index} className="text-sm">{r}</li>  // Mostrar cada razón por separado
            ))}
          </ul>
        </div>

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
