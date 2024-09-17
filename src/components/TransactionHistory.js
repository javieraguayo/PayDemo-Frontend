import React from 'react';
import { useHistory } from 'react-router-dom';

function TransactionHistory({ transactions }) {
  const history = useHistory();

  const viewDetails = (id) => {
    history.push(`/history/${id}`);
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
