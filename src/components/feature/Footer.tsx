
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-pink-400 mb-4" style={{fontFamily: '"Pacifico", serif'}}>
              Casa Balloon
            </h3>
            <p className="text-gray-300 mb-4">
              Especialistas en globos personalizados y marcos decorativos para todos tus eventos especiales. 
              Hacemos realidad tus ideas más creativas.
            </p>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/profile.php?id=100063497352972" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 cursor-pointer">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="https://www.instagram.com/casaballoonacapulco/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 cursor-pointer">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 cursor-pointer">
                <i className="ri-whatsapp-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-pink-400 cursor-pointer">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo-globos" className="text-gray-300 hover:text-pink-400 cursor-pointer">
                  Catálogo de Globos
                </Link>
              </li>
              <li>
                <Link to="/catalogo-marcos" className="text-gray-300 hover:text-pink-400 cursor-pointer">
                  Fondos Decorativos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-pink-400 cursor-pointer">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <i className="ri-phone-line mr-2"></i>
                <span>744 103 8675</span>
              </div>
              <div className="flex items-center">
                <i className="ri-map-pin-line mr-2"></i>
                <span>Acapulco, Guerrero</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 Casa Balloon. Todos los derechos reservados.</p>
              <p className="mt-2">
                <a href="https://readdy.ai/?origin=logo" className="text-gray-400 hover:text-pink-400 cursor-pointer">
                  Website Builder
                </a>
              </p>
            </div>
            
            {/* Panel Admin */}
            <div className="text-center md:text-right">
              <Link 
                to="/admin" 
                className="inline-flex items-center text-gray-500 hover:text-pink-400 cursor-pointer text-sm transition-colors"
              >
                <i className="ri-admin-line mr-1"></i>
                Panel Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
