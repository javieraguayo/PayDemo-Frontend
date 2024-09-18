import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processPayment } from '../services/paymentService';
import { validateCardNumber, validateCardExpiry, validateCVV, validateAmount } from '../utils/validation';

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar campos vacíos
    if (!cardNumber || !expiryDate || !cvv || !amount) {
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
      const result = await processPayment({ cardNumber, expiryDate, cvv, amount });
      navigate('/success', { state: { data: result } });
    } catch (error) {
      setError(error.message);
      navigate('/failure', { state: { reason: error.message } });
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label> Número de Tarjeta:</label>
        <input 
          type="text" 
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
        />
      </div>
      <div>
        <label> Fecha de Expiración (MM/AA):</label>
        <input 
          type="text" 
          value={expiryDate} 
          onChange={(e) => setExpiryDate(e.target.value)} 
        />
      </div>
      <div>
        <label> CVV:</label>
        <input 
          type="text" 
          value={cvv} 
          onChange={(e) => setCvv(e.target.value)} 
        />
      </div>
      <div>
        <label> Monto:</label>
        <input 
          type="text" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
      </div>
      <button type="submit">Pagar</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default PaymentForm;
