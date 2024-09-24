import { useState } from 'react';
import { UserIcon, CheckCircle, AlertTriangle, LoaderCircle } from 'lucide-react';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '', confirmPassword: '' };

    // Validación de email
    if (!email) {
      newErrors.email = 'El campo de email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato de email es inválido';
    }

    if (!password) {
      newErrors.password = 'El campo de contraseña es obligatorio';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
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

        if (response.ok) {
          setSuccessMessage('Registro exitoso. Redirigiendo al inicio de sesión...');

          setTimeout(() => {
            window.location.replace('/login');
          }, 3000);
        } else {
          setServerError(data.message || 'Error en el registro');
        }
      } catch (error) {
        setServerError('Error en la conexión con el servidor');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <UserIcon className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Registrarse</h2>

        {/* Mostrar mensaje de éxito con ícono */}
        {successMessage ? (
          <div className="flex items-center justify-center flex-col">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          </div>
        ) : (
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Mostrar error del servidor */}
            {serverError && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                <p className="text-sm">{serverError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 flex justify-center items-center"
            >
              {loading ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                'Registrarse'
              )}
            </button>

            <p className="mt-4 text-center">
              <span className="text-gray-600">¿Ya tienes una cuenta?{' '}</span>
              <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Inicia sesión
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
