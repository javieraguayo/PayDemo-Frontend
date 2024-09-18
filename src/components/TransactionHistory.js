import React from 'react';
import { useNavigate  } from 'react-router-dom';

function TransactionHistory({ transactions }) {
  const navigate = useNavigate();

  const viewDetails = (id) => {
    navigate(`/history/${id}`);
  };

  return (
    <div>
      <h2>Historial de Transacciones</h2>
      <ul>
        {transactions.map((txn) => (
          <li key={txn.id}>
            <p>Fecha: {txn.date}</p>
            <p>Monto: {txn.amount}</p>
            <button onClick={() => viewDetails(txn.id)}>Ver detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
