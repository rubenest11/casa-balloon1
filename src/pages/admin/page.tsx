
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/base/Button';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Verificar si hay una sesión activa al cargar la página
  useEffect(() => {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession === 'active') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'balloon' && password === '965378') {
      setIsAuthenticated(true);
      setError('');
      // Guardar la sesión en localStorage
      localStorage.setItem('adminSession', 'active');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setError('');
    // Eliminar la sesión del localStorage
    localStorage.removeItem('adminSession');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="secondary">
                  Ver Sitio Web
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="secondary">
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gestión de Globos */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <i className="ri-balloon-line text-2xl text-pink-500"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Catálogo de Globos</h3>
            <p className="text-gray-600 mb-6">
              Gestiona el catálogo de globos personalizados, precios y categorías.
            </p>
            <Link to="/catalogo-globos?admin=true">
              <Button variant="primary" className="w-full">
                Gestionar Globos
              </Button>
            </Link>
          </div>

          {/* Gestión de Fondos Decorativos */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <i className="ri-image-line text-2xl text-purple-500"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fondos Decorativos</h3>
            <p className="text-gray-600 mb-6">
              Administra el catálogo de marcos y fondos decorativos para eventos.
            </p>
            <Link to="/catalogo-marcos?admin=true">
              <Button variant="primary" className="w-full">
                Gestionar Fondos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
