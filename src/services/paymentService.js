export async function processPayment(paymentData) {
    try {
      const response = await fetch('/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
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
  