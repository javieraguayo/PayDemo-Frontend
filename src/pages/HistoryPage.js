import React, { useEffect, useState } from 'react';
import TransactionHistory from '../components/TransactionHistory';
import { getTransactionHistory } from '../services/transactionService';

function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getTransactionHistory();
        setTransactions(data);
      } catch (error) {
        setError('Error al obtener el historial de transacciones.');
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Historial de Transacciones</h1>
      {error && <p>{error}</p>}
      <TransactionHistory transactions={transactions} />
    </div>
  );
}

export default HistoryPage;
