import React from 'react';
import { useLocation } from 'react-router-dom';

function FailurePage() {
  const location = useLocation();
  const { reason } = location.state || { reason: 'Razón desconocida' };

  return (
    <div>
      <h1>Transacción Fallida</h1>
      <p>La transacción no pudo completarse debido a: {reason}</p>
    </div>
  );
}

export default FailurePage;