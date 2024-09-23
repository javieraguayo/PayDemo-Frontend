import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

function TransactionHistory({ transactions }) {
  const navigate = useNavigate();

  const viewDetails = (id) => {
    navigate(`/history/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {transactions.map((txn) => (
          <li key={txn.id} className="py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {txn.status === 'exitosa' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <p className="text-lg font-medium text-gray-900">${txn.amount} CLP</p>
                <p className="text-sm text-gray-500">{formatDate(txn.date)}</p>
              </div>
            </div>
            <button
              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              onClick={() => viewDetails(txn.id)}
            >
              Ver detalles
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
