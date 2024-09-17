export async function getTransactionHistory() {
    try {
      const response = await fetch('/transactions');
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Error en el servidor');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Error de red');
    }
}
  