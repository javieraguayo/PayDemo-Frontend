import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

function TransactionHistory({ transactions }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {sortedTransactions.map((txn) => (
          <li key={txn.id} className="py-4 px-4 flex justify-between items-center hover:bg-gray-50 transition-colors ease-in-out duration-150">
            {/* Columna izquierda: Ícono, monto y fecha */}
            <div className="flex items-center space-x-4">
              {/* Icono de estado */}
              {txn.status === 'exitosa' ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500" />
              )}
              <div>
                <p className="text-xl font-semibold text-gray-900">{formatAmount(txn.amount)}</p>
                <p className="text-sm text-gray-500">{formatDate(txn.date)}</p>
              </div>
            </div>

            {/* Columna derecha: Estado de la transacción */}
            <div className="flex items-center">
              {txn.status === 'exitosa' ? (
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                  Exitosa
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                  Fallida
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
