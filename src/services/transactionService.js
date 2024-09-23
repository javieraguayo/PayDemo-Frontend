export async function getTransactionHistory() {
  try {
    const response = await fetch('http://192.168.0.25:4000/transactions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Error en el servidor');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Error de red');
  }
}
