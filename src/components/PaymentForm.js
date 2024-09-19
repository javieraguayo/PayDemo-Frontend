import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processPayment } from '../services/paymentService';
import { validateCardNumber, validateCardExpiry, validateCVV, validateAmount } from '../utils/validation';
import { User, CreditCard, Calendar, Lock, DollarSign } from 'lucide-react';


function PaymentForm() {
  const [fullName, setFullName] = useState('');  // Nuevo estado para el nombre completo
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar campos vacíos
    if (!fullName || !cardNumber || !expiryDate || !cvv || !amount) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    // Validaciones individuales
    if (!validateCardNumber(cardNumber)) {
      setError('Número de tarjeta inválido');
      return;
    }
    if (!validateCVV(cvv)) {
      setError('CVV inválido');
      return;
    }
    
    // Validación del monto
    if (!validateAmount(amount)) {
      navigate('/failure', { state: { reason: 'Monto debe ser mayor a 5000' } });
      return;
    }
  
    // Validación de la fecha de expiración
    if (!validateCardExpiry(expiryDate)) {
      navigate('/failure', { state: { reason: 'Fecha de expiración inválida' } });
      return;
    }
  
    try {
      const result = await processPayment({ fullName, cardNumber, expiryDate, cvv, amount });
      navigate('/success', { state: { data: result } });
    } catch (error) {
      setError(error.message);
      navigate('/failure', { state: { reason: error.message } });
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Simulador de Pagos</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo de Nombre Completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu nombre completo"
              />
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
  
          {/* Campo de Número de Tarjeta */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1234 5678 9012 3456"
              />
              <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
  
          {/* Campo de Fecha de Expiración y CVV */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MM/YY"
                />
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>
  
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123"
                />
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
  
          {/* Campo de Monto */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Monto a pagar (CLP)</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Monto"
              />
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full py-3 mt-6 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Pagar
          </button>
  
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
  
}

export default PaymentForm;
