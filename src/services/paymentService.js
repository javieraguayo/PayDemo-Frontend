export async function processPayment(paymentData) {
  try {
    const token = localStorage.getItem('token');

    console.log('Enviando datos al backend:', paymentData);  // Log de los datos enviados

    const response = await fetch('http://192.168.0.25:4000/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const result = await response.json();
      console.log('Error del servidor:', result);  // Log del error del servidor
      throw new Error(result.message || 'Error en el servidor');
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);  // Log de la respuesta del backend
    return data;

  } catch (error) {
    console.error('Error en el proceso de pago:', error);  // Log de error
    throw new Error(error.message || 'Error de red');
  }
}
