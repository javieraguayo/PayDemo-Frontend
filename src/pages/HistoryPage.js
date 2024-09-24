import React, { useEffect, useState } from 'react';
import TransactionHistory from '../components/TransactionHistory';
import { getTransactionHistory } from '../services/transactionService';
import NavigationBar from '../components/NavigationBar';  // Importar la barra de navegación

function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Indicador de carga

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getTransactionHistory();
        setTransactions(data);
      } catch (error) {
        setError('Error al obtener el historial de transacciones.');
      } finally {
        setLoading(false);  // Terminar la carga
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <NavigationBar />  {/* Barra de navegación */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md mt-5">
          <h1 className="text-2xl font-semibold text-center mb-6">Historial de Transacciones</h1>
          
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
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
