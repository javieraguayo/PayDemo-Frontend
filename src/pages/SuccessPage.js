import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  // Función para formatear el monto con puntos y símbolo CLP
  const formatAmount = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  const maskCardNumber = (number) => {
    return number ? `**** **** **** ${number.slice(-4)}` : 'Número de tarjeta no disponible';
  };

  return (
  <div>
    <NavigationBar />  {/* Barra de navegación */}
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-900 mt-4 text-green-600">Transacción Exitosa</h1>
        
        {/* Contenedor de los detalles de la transacción */}
        <div className="text-gray-700 mt-6 text-left">  
          <p className="font-semibold">Nombre: <span className="font-normal">{data?.name || 'Nombre no disponible'}</span></p>
          <p className="font-semibold">Número de tarjeta: <span className="font-normal">{data ? maskCardNumber(data.cardNumber) : 'Número de tarjeta no disponible'}</span></p>
          <p className="font-semibold">Monto: <span className="font-normal">{data ? formatAmount(data.amount) : 'Monto no disponible'}</span></p>
          <p className="font-semibold">Fecha: <span className="font-normal">{data ? new Date(data.date).toLocaleString('es-CL') : 'Fecha no disponible'}</span></p>
        </div>
        
        <button
          onClick={() => navigate('/home')}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  </div>
  );
}

export default SuccessPage;
