
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Verificar si estamos en el panel admin o en modo admin de secciones
  const isAdminPanel = location.pathname === '/admin';
  const isAdminMode = isAdminPanel || new URLSearchParams(location.search).get('admin') === 'true';

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo de Globos', href: '/catalogo-globos' },
    { name: 'Fondos Decorativos', href: '/catalogo-marcos' },
    { name: 'Contacto', href: '/contacto' }
  ];

  const adminNavigation = [
    { name: 'Vista Pública', href: '/' },
    { name: 'Gestionar Globos', href: '/catalogo-globos?admin=true' },
    { name: 'Gestionar Fondos', href: '/catalogo-marcos?admin=true' }
  ];

  const currentNavigation = isAdminMode ? adminNavigation : navigation;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isAdminMode ? "/admin" : "/"} className="flex items-center">
            <span className="text-2xl font-bold text-pink-500" style={{fontFamily: '"Pacifico", serif'}}>
              {isAdminMode ? 'Panel Admin' : 'Casa Balloon'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  location.pathname === item.href || 
                  (item.href.includes('?admin=true') && location.pathname + location.search === item.href)
                    ? 'text-pink-500 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-500 hover:bg-pink-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-500 cursor-pointer"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {currentNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    location.pathname === item.href ||
                    (item.href.includes('?admin=true') && location.pathname + location.search === item.href)
                      ? 'text-pink-500 bg-pink-50'
                      : 'text-gray-700 hover:text-pink-500 hover:bg-pink-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
