
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';

export default function Contacto() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Contacto</h1>
          <p className="text-xl text-pink-100 max-w-3xl mx-auto">
            ¿Listo para hacer tu evento inolvidable? Contáctanos y te ayudaremos a crear la decoración perfecta
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-xl text-pink-500"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Ubicación</h3>
                    <p className="text-gray-600">Acapulco, Guerrero</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-xl text-pink-500"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Teléfono</h3>
                    <a 
                      href="tel:7441038675" 
                      className="text-pink-500 hover:text-pink-600 font-medium cursor-pointer"
                    >
                      744 103 8675
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-time-line text-xl text-pink-500"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Horario de Atención</h3>
                    <p className="text-gray-600">
                      Siempre abierto<br />
                      24 horas, 7 días a la semana
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex space-x-4">
                  <a href="https://web.facebook.com/profile.php?id=100063497352972" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 cursor-pointer">
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="https://www.instagram.com/casaballoonacapulco?igsh=MXQxYzU3NnowYW1vaQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 cursor-pointer">
                    <i className="ri-instagram-line"></i>
                  </a>
                </div>
              </div>

            </div>

            {/* WhatsApp Contact */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Solicita tu Cotización</h2>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-whatsapp-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    ¡Contáctanos por WhatsApp!
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Envíanos un mensaje y te ayudaremos a crear la decoración perfecta para tu evento especial
                  </p>
                </div>

                <a 
                  href="https://wa.link/7qnkea" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-6
                  text-white font-bold text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-whatsapp-line text-2xl mr-3"></i>
                  Enviar Mensaje por WhatsApp
                </a>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Respuesta inmediata • Atención personalizada</p>
                </div>
              </div>

              {/* Additional Contact Options */}
              <div className="mt-8 space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">¿Prefieres llamar?</h4>
                  <a 
                    href="tel:7441038675"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-phone-line text-xl mr-2"></i>
                    Llamar Ahora: 744 103 8675
                  </a>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Información que nos ayuda:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Tipo de evento (cumpleaños, boda, XV años, etc.)</li>
                    <li>• Fecha del evento</li>
                    <li>• Número aproximado de invitados</li>
                    <li>• Colores o tema preferido</li>
                    <li>• Presupuesto aproximado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
