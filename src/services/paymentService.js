export async function processPayment(paymentData) {
  try {
    const token = localStorage.getItem('token');
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
      throw new Error(result.message || 'Error en el servidor');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(error.message || 'Error de red');
  }
}
