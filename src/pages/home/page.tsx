
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';

export default function Home() {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{src: string, alt: string, title: string} | null>(null);

  const services = [
    {
      icon: 'ri-heart-3-line',
      title: 'Globos Personalizados',
      description: 'Diseños únicos con nombres, fechas y mensajes especiales para tu evento.',
      link: '/catalogo-globos'
    },
    {
      icon: 'ri-image-line',
      title: 'Fondos Decorativos',
      description: 'Fondos temáticos perfectos para fiestas de XV años, bodas y cumpleaños.',
      link: '/catalogo-marcos'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      event: 'Quinceañera',
      text: 'Los globos y marcos fueron perfectos para la fiesta de mi hija. ¡Superaron nuestras expectativas!',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      event: 'Boda',
      text: 'El servicio fue excepcional. Los marcos personalizados hicieron nuestra boda aún más especial.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      event: 'Cumpleaños',
      text: 'Calidad increíble y atención al detalle. Definitivamente los recomiendo para cualquier evento.',
      rating: 5
    }
  ];

  const galleryImages = [
    {
      src: "https://static.readdy.ai/image/2d8922a617b4283fedb889b9400131db/fc085f682d12dcf71e90ce4824cf953f.jpeg",
      alt: "Decoración XV Años",
      title: "Fiestas de XV Años"
    },
    {
      src: "https://static.readdy.ai/image/2d8922a617b4283fedb889b9400131db/686bc510da04ee954d409284eb0fa000.jpeg",
      alt: "Decoración Bodas",
      title: "Bodas"
    },
    {
      src: "https://static.readdy.ai/image/2d8922a617b4283fedb889b9400131db/e89bc9e37c4ee758d56fc7935ce8a81b.jpeg",
      alt: "Decoración Cumpleaños",
      title: "Cumpleaños"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Beautiful%20balloon%20decorations%20and%20elegant%20photo%20frames%20setup%20for%20party%20events%2C%20soft%20pastel%20colors%2C%20professional%20event%20decoration%2C%20dreamy%20atmosphere%20with%20balloons%20floating%2C%20wedding%20and%20birthday%20party%20decorations%2C%20high%20quality%20professional%20photography%2C%20soft%20lighting%2C%20romantic%20and%20festive%20ambiance&width=1920&height=1080&seq=hero-casa-balloon&orientation=landscape')`
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{fontFamily: '"Pacifico", serif'}}>
            Casa Balloon
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Globos personalizados y marcos decorativos para hacer tus eventos inolvidables
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogo-globos">
              <Button variant="primary" size="lg">
                Ver Catálogo de Globos
              </Button>
            </Link>
            <Link to="/catalogo-marcos">
              <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-gray-900">
                Ver Fondos Decorativos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especializados en crear momentos mágicos con decoraciones personalizadas para cada ocasión especial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-10 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-8 mx-auto">
                  <i className={`${service.icon} text-3xl text-pink-500`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-8 text-center leading-relaxed">{service.description}</p>
                <div className="text-center">
                  <Link to={service.link}>
                    <Button variant="primary" size="lg">
                      Ver Más
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Galería de Trabajos</h2>
            <p className="text-xl text-gray-600">Algunos de nuestros trabajos más destacados</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer"
                onClick={() => setSelectedGalleryImage(image)}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-white text-lg font-semibold block mb-2">{image.title}</span>
                    <i className="ri-zoom-in-line text-white text-2xl"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-xl text-gray-600">Testimonios reales de eventos exitosos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-pink-500">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para tu Evento Especial?</h2>
          <p className="text-xl text-pink-100 mb-8">
            Contactanos hoy y hagamos realidad la decoración de tus sueños
          </p>
          <a href="https://wa.link/7qnkea" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-pink-500">
              Solicitar Cotización
            </Button>
          </a>
        </div>
      </section>

      {/* Image Modal */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl max-h-screen w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer z-10 transition-all"
            >
              <i className="ri-close-line text-2xl text-white"></i>
            </button>
            
            <div className="relative max-w-full max-h-full">
              <img 
                src={selectedGalleryImage.src}
                alt={selectedGalleryImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-center">{selectedGalleryImage.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
