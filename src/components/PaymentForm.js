import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
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
    
    if (!validateCardNumber(cardNumber)) {
      setError('Número de tarjeta inválido');
      return;
    }
    if (!validateCardExpiry(expiryDate)) {
      setError('Fecha de expiración inválida');
      return;
    }
    if (!validateCVV(cvv)) {
      setError('CVV inválido');
      return;
    }
    if (!validateAmount(amount)) {
      setError('Monto debe ser mayor a 5000');
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
