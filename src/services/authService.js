export async function login(email, password) {
    try {
      const response = await fetch('http://192.168.0.25:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error de autenticación');
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || 'Error en la conexión con el servidor');
    }
}
  
export async function register(email, password) {
  try {
    const response = await fetch('http://192.168.0.25:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error en la conexión con el servidor');
  }
}
