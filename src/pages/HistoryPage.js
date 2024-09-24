import React, { useEffect, useState } from 'react';
import TransactionHistory from '../components/TransactionHistory';
import { getTransactionHistory } from '../services/transactionService';
import NavigationBar from '../components/NavigationBar';

function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionHistory();
        setTransactions(data);
      } catch (error) {
        setError('Error al obtener el historial de transacciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <NavigationBar />  {/* Barra de navegación */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Historial de Transacciones</h1>

          {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : transactions.length > 0 ? (
              <TransactionHistory transactions={transactions} />
            ) : (
              <p className="text-center text-gray-500">No se encontraron transacciones.</p>
            )}

        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
