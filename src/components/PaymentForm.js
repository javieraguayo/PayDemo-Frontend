import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processPayment } from '../services/paymentService';
import { validateCardNumber, validateCardExpiry, validateCVV, validateAmount } from '../utils/validation';
import { User, CreditCard, Calendar, Lock, DollarSign, AlertCircle } from 'lucide-react';

function PaymentForm() {
  const [name, setFullName] = useState('');  
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formatCardNumber = (value) => {
    return value
      .replace(/\s+/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const cleanCardNumber = (value) => {
    return value.replace(/\s+/g, '');
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };
  
  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length >= 3) {
      return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
    }
    return cleanedValue;
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };


  const handleServerFailedTransaction = async (reason) => {
    try {
      const cleanedCardNumber = cleanCardNumber(cardNumber);
      const cleanedAmount = amount.replace(/\./g, '');
  
      await processPayment({ 
        name, 
        cardNumber: cleanedCardNumber,
        expirationDate, 
        cvv, 
        amount: cleanedAmount 
      });
      
      navigate('/failure', { state: { reason, amount: `$${amount} CLP`, date: new Date().toLocaleString() } });
    } catch (error) {
      console.error('Error al registrar la transacción fallida en el servidor: ', error);
      setError('Error al registrar la transacción fallida');
    }
  };
  const formatAmountWithDots = (value) => {
    return value.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    const formattedAmount = formatAmountWithDots(e.target.value);
    setAmount(formattedAmount);
  };

  const cleanAmount = (value) => {
    return value.replace(/\./g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !cardNumber || !expirationDate || !cvv || !amount) {
      setError('Todos los campos son obligatorios');
      return;
    }
  
    const cleanedCardNumber = cleanCardNumber(cardNumber);
    const reasons = []; // Array para acumular razones de fallo

    if (!validateCardNumber(cleanedCardNumber)) {
      setError('Número de tarjeta inválido');
      reasons.push('Número de tarjeta inválido');
      return;
    }
  
    if (!validateCVV(cvv)) {
      setError('CVV inválido');
      reasons.push('CVV inválido');
      return;
    }

    // Limpia el monto antes de enviarlo
    const cleanAmountValue = cleanAmount(amount);

    if (!validateAmount(cleanAmountValue)) {
      reasons.push('Monto debe ser mayor a $5.000');
    }
  
    if (!validateCardExpiry(expirationDate)) {
      reasons.push('Fecha de expiración inválida o pasada');
    }

    if (reasons.length > 0) {
      await handleServerFailedTransaction(reasons);
      return;
    }
  
    try {
      const result = await processPayment({ 
        name, 
        cardNumber: cleanedCardNumber || '',
        expirationDate, 
        cvv, 
        amount: cleanAmountValue
      });
  
      if (result.status === 'fallida') {
        navigate('/failure', { state: { reason: result.reason } });
      } else {
        navigate('/success', { state: { data: result } });
      }
    } catch (error) {
      setError(error.message);
      navigate('/failure', { state: { reason: error.message } });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Ingrese los datos de pago</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo de Nombre Completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu nombre completo"
                maxLength={60}
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
                onChange={handleCardNumberChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
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
                    value={expirationDate}
                    onChange={handleExpiryDateChange}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123"
                  maxLength="4"
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
                onChange={(e) => handleAmountChange(e)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Monto"
              />
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              <p className="text-sm">{error}</p>
            </div>
          )}
  
          <button
            type="submit"
            className="w-full py-3 mt-6 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Pagar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
