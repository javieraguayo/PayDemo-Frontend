import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

function FailurePage() {
  const location = useLocation();
  const { reason, amount, date } = location.state || { reason: 'Razón desconocida', amount: '$0 CLP', date: 'Desconocido' };

  // Si reason no es un array, lo convertimos en un array
  const reasonArray = Array.isArray(reason) ? reason : [reason];

  const navigate = useNavigate();

  return (
  <div>
      <NavigationBar /> 
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900 mt-4 text-red-600">Transacción Fallida</h1>

        <p className="text-gray-700 mt-4">Lo sentimos, su transacción no pudo ser procesada.</p>
        <p className="mt-4 text-left font-medium">
          <strong>Monto:</strong> {amount}<br />
          <strong>Fecha:</strong> {date}
        </p>

        <div className="mt-4 text-gray-600 text-left">
          <p className="font-bold">Razones posibles:</p>
          <ul className="list-disc list-inside">
            {reasonArray.map((r, index) => (
              <li key={index} className="text-sm">{r}</li>
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
  </div>
  );
}

export default FailurePage;
