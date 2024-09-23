import { useState } from 'react';
import { UserIcon } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [serverError, setServerError] = useState(''); // Para manejar errores del servidor

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    // Validación de email
    if (!email) {
      newErrors.email = 'El campo de email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato de email es inválido';
    }

    // Validación de contraseña
    if (!password) {
      newErrors.password = 'El campo de contraseña es obligatorio';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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

        if (response.ok) {
          console.log('Inicio de sesión exitoso:', data);
          localStorage.setItem('token', data.token);
          window.location.replace('/home'); 
        } else {
          setServerError(data.message || 'Error de autenticación');
        }
      } catch (error) {
        setServerError('Error en la conexión con el servidor');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <UserIcon className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Iniciar Sesión</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500"
          >
            Iniciar Sesión
          </button>
          <p className="mt-4 text-center">
          <span className="text-gray-600">
            ¿No tienes una cuenta?{' '}
          </span>
          <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Regístrate aquí
          </a>
        </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
