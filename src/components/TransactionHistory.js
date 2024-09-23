import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

function TransactionHistory({ transactions }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div>
        <ul className="divide-y divide-gray-200">
          {transactions.map((txn) => (
            <li key={txn.id} className="py-4 flex justify-between items-center">
              {/* Columna izquierda: Ícono, monto y fecha */}
              <div className="flex items-center space-x-4">
                {/* Icono de estado */}
                {txn.status === 'exitosa' ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <div>
                  <p className="text-xl font-semibold text-gray-900">${parseFloat(txn.amount).toLocaleString()} CLP</p>
                  <p className="text-sm text-gray-500">{formatDate(txn.date)}</p>
                </div>
              </div>

              {/* Columna derecha: Razón de fallo si existe */}
              {txn.status === 'fallida' && (
                <div className="flex flex-col items-end">
                  {/* Etiqueta redondeada para la razón de fallo */}
                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                    {txn.reason}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default TransactionHistory;
