import React from 'react';
import { useLocation } from 'react-router-dom';

function Receipt() {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div>
      <h1>Comprobante de Pago</h1>
      {data ? (
        <>
          <p>Nombre: {data.name}</p>
          <p>Monto: {data.amount}</p>
          <p>Fecha: {data.date}</p>
        </>
      ) : (
        <p>No se encontraron datos de pago.</p>
      )}
    </div>
  );
}

export default Receipt;
