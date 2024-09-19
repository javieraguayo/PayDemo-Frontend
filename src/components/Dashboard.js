import { useState, useEffect } from 'react';
import { CreditCard, History, DollarSign, CheckCircle, TrendingUp, PieChart, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [lastTransaction, setLastTransaction] = useState({
    amount: 7500,
    date: '2023-06-15',
    status: 'success'
  });
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [averageTransaction, setAverageTransaction] = useState(0);
  const [successfulTransactions, setSuccessfulTransactions] = useState(0);
  const [failedTransactions, setFailedTransactions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTotalTransactions(42);
      setAverageTransaction(6000);
      setSuccessfulTransactions(38);
      setFailedTransactions(4);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Bienvenido</h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Tarjeta de Simulación de Pago */}
            <motion.div 
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/payment" className="block h-full">
                <div className="p-5">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                    <div className="ml-5 w-0 flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 truncate">Simular Pago</h2>
                      <p className="mt-1 text-sm text-gray-600">Prueba una nueva transacción</p>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 px-5 py-3">
                  <div className="text-sm font-medium text-indigo-700">Iniciar simulación →</div>
                </div>
              </Link>
            </motion.div>

            {/* Tarjeta de Historial de Transacciones */}
            <motion.div 
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/historial" className="block h-full">
                <div className="p-5">
                  <div className="flex items-center">
                    <History className="h-8 w-8 text-green-600" aria-hidden="true" />
                    <div className="ml-5 w-0 flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 truncate">Historial</h2>
                      <p className="mt-1 text-sm text-gray-600">Ver tus transacciones pasadas</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 px-5 py-3">
                  <div className="text-sm font-medium text-green-700">Ver historial completo →</div>
                </div>
              </Link>
            </motion.div>

            {/* Tarjeta de Última Transacción */}
            <motion.div 
              className="bg-white overflow-hidden shadow-lg rounded-lg"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  <div className="ml-5 w-0 flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 truncate">Última Transacción</h2>
                    <p className="mt-1 text-2xl font-bold text-gray-900">${lastTransaction.amount.toLocaleString()} CLP</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 px-5 py-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">{new Date(lastTransaction.date).toLocaleDateString()}</span>
                  {lastTransaction.status === 'success' ? (
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Exitosa</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-700">
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Fallida</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Estadísticas Rápidas */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Transacciones */}
            <motion.div 
              className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 p-5 relative"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" aria-hidden="true" />
                <div className="ml-5 w-0 flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">Total Transacciones</h2>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2 text-center">
                {loading ? <span className="animate-pulse bg-gray-200 h-8 w-24 rounded"></span> : totalTransactions}
              </div>
            </motion.div>

            {/* Promedio de Transacciones */}
            <motion.div 
              className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 p-5 relative"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <PieChart className="h-8 w-8 text-green-600" aria-hidden="true" />
                <div className="ml-5 w-0 flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">Promedio de Transacciones</h2>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2 text-center">
                {loading ? <span className="animate-pulse bg-gray-200 h-8 w-24 rounded"></span> : `$${averageTransaction.toLocaleString()} CLP`}
              </div>
            </motion.div>

            {/* Transacciones Exitosas y Fallidas */}
            <motion.div 
              className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 p-5 relative"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <ArrowRightLeft className="h-8 w-8 text-green-600" aria-hidden="true" />
                <div className="ml-5 w-0 flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">Transacciones</h2>
                </div>
              </div>
              <div className="flex justify-around mt-2">
                <div className="text-center">
                  <span className="text-green-600 font-bold text-2xl">{loading ? <span className="animate-pulse bg-gray-200 h-8 w-12 rounded"></span> : successfulTransactions}</span>
                  <span className="block text-sm text-gray-600">Exitosas</span>
                </div>
                <div className="text-center">
                  <span className="text-red-600 font-bold text-2xl">{loading ? <span className="animate-pulse bg-gray-200 h-8 w-12 rounded"></span> : failedTransactions}</span>
                  <span className="block text-sm text-gray-600">Fallidas</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
