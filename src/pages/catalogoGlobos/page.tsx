
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';
import { uploadImage, supabase, deleteImage } from '../../utils/supabase';

export default function CatalogoGlobos() {
  const location = useLocation();
  const isAdminMode = location.pathname.includes('/admin') || new URLSearchParams(location.search).get('admin') === 'true';
  
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'cumpleanos', name: 'Cumpleaños' },
    { id: 'bodas', name: 'Bodas' },
    { id: 'xv-anos', name: 'XV Años' },
    { id: 'baby-shower', name: 'Baby Shower' },
    { id: 'graduacion', name: 'Graduación' }
  ];

  // Cargar productos desde Supabase
  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('globos_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddProduct = async (newProduct: any) => {
    try {
      const productData = {
        ...newProduct,
        features: newProduct.features.split(',').map((f: string) => f.trim())
      };

      const { data, error } = await supabase
        .from('globos_products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        alert('Error al agregar el producto. Por favor intenta de nuevo.');
        return;
      }

      setProducts([data, ...products]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error al agregar el producto. Por favor intenta de nuevo.');
    }
  };

  const handleEditProduct = async (updatedProduct: any) => {
    try {
      const productData = {
        ...updatedProduct,
        features: typeof updatedProduct.features === 'string' 
          ? updatedProduct.features.split(',').map((f: string) => f.trim())
          : updatedProduct.features,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('globos_products')
        .update(productData)
        .eq('id', updatedProduct.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        alert('Error al actualizar el producto. Por favor intenta de nuevo.');
        return;
      }

      setProducts(products.map(p => p.id === data.id ? data : p));
      setIsEditing(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto. Por favor intenta de nuevo.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        // Encontrar el producto a eliminar
        const productToDelete = products.find(p => p.id === id);
        
        if (productToDelete) {
          // Eliminar todas las imágenes del almacenamiento
          const imagesToDelete = productToDelete.images || [productToDelete.image].filter(Boolean);
          
          for (const imageUrl of imagesToDelete) {
            try {
              await deleteImage(imageUrl);
            } catch (error) {
              console.error('Error deleting image:', imageUrl, error);
            }
          }
        }

        // Eliminar el producto de la base de datos
        const { error } = await supabase
          .from('globos_products')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting product:', error);
          alert('Error al eliminar el producto. Por favor intenta de nuevo.');
          return;
        }

        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error al eliminar el producto. Por favor intenta de nuevo.');
      }
    }
  };

  const ProductForm = ({ product, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      category: 'cumpleanos',
      price: '',
      image: '',
      description: '',
      features: '',
      images: []
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>(product?.images || [product?.image].filter(Boolean) || []);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    // Función para formatear números con comas
    const formatNumber = (value: string) => {
      // Remover todo excepto números
      const numbers = value.replace(/[^\d]/g, '');
      // Agregar comas cada tres dígitos
      return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Función para obtener solo el número del precio
    const getPriceNumber = (price: string) => {
      return price.replace(/^Desde \$/, '').replace(/ MXN$/, '').replace(/,/g, '');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setImageFiles(prev => [...prev, ...files]);
        
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreviews(prev => [...prev, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
        });
      }
    };

    const removeImage = (index: number) => {
      const imageToRemove = imagePreviews[index];
      
      // Si es una imagen existente (URL de Supabase), eliminarla del almacenamiento
      if (imageToRemove && imageToRemove.startsWith('http') && imageToRemove.includes('supabase')) {
        deleteImage(imageToRemove).catch(error => {
          console.error('Error deleting image from storage:', error);
        });
      }
      
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
      setImageFiles(prev => prev.filter((_, i) => i !== index));
      
      // Actualizar las imágenes en formData si es un producto existente
      if (product && formData.images) {
        const updatedImages = formData.images.filter((_: string, i: number) => i !== index);
        setFormData({...formData, images: updatedImages});
      }
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
      const newPreviews = [...imagePreviews];
      const [movedPreview] = newPreviews.splice(fromIndex, 1);
      newPreviews.splice(toIndex, 0, movedPreview);
      setImagePreviews(newPreviews);

      if (imageFiles.length > 0) {
        const newFiles = [...imageFiles];
        const [movedFile] = newFiles.splice(fromIndex, 1);
        newFiles.splice(toIndex, 0, movedFile);
        setImageFiles(newFiles);
      }
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      if (draggedIndex !== null && draggedIndex !== dropIndex) {
        moveImage(draggedIndex, dropIndex);
      }
      setDraggedIndex(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsUploading(true);
      
      try {
        let imageUrls = [...(formData.images || [])];
        
        if (imageFiles.length > 0) {
          const uploadPromises = imageFiles.map(file => uploadImage(file, 'globos'));
          const newImageUrls = await Promise.all(uploadPromises);
          imageUrls = [...imageUrls, ...newImageUrls];
        }
        
        const priceNumber = getPriceNumber(formData.price);
        const formattedPrice = formatNumber(priceNumber);
        
        onSave({
          ...formData,
          price: `Desde $${formattedPrice} MXN`,
          image: imageUrls[0] || formData.image,
          images: imageUrls
        });
      } catch (error) {
        console.error('Error al subir imágenes:', error);
        alert('Error al subir las imágenes. Por favor intenta de nuevo.');
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 pr-8"
                >
                  {categories.filter(c => c.id !== 'todos').map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    Desde $
                  </span>
                  <input
                    type="text"
                    value={formatNumber(getPriceNumber(formData.price))}
                    onChange={(e) => {
                      const formattedValue = formatNumber(e.target.value);
                      setFormData({...formData, price: formattedValue});
                    }}
                    className="w-full pl-20 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="800"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    MXN
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes del Producto</label>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="w-full px-4 py-3 bg-pink-500 hover:bg-pink-6 text-white font-medium rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap flex items-center justify-center"
                    >
                      <i className="ri-upload-2-line mr-2"></i>
                      Seleccionar Imágenes
                    </label>
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Imágenes seleccionadas ({imagePreviews.length}):
                        <span className="text-xs text-gray-500 ml-2">Arrastra para reordenar</span>
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {imagePreviews.map((preview, index) => (
                          <div 
                            key={index} 
                            className={`relative group cursor-move ${draggedIndex === index ? 'opacity-50' : ''}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                          >
                            <img 
                              src={preview} 
                              alt={`Vista previa ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <div className="absolute top-1 left-1 bg-pink-500 text-white text-xs px-1 rounded">
                              {index + 1}
                            </div>
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <i className="ri-drag-move-line text-white bg-black/50 rounded p-1 text-xs"></i>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <i className="ri-close-line text-xs"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Características (separadas por comas)
                </label>
                <textarea
                  value={typeof formData.features === 'string' ? formData.features : formData.features?.join(', ')}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  rows={2}
                  placeholder="Material premium, Diseño personalizado, Colores vibrantes"
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Subiendo...
                    </>
                  ) : (
                    `${product ? 'Actualizar' : 'Agregar'} Producto`
                  )}
                </Button>
                <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <i className="ri-loader-4-line animate-spin text-4xl text-pink-500 mb-4"></i>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            {isAdminMode ? 'Administrar ' : ''}Catálogo de Globos
          </h1>
          <p className="text-xl text-pink-100 max-w-3xl mx-auto">
            {isAdminMode 
              ? 'Gestiona tu catálogo de globos personalizados'
              : 'Descubre nuestra amplia selección de globos personalizados para cada evento especial'
            }
          </p>
        </div>
      </section>

      {/* Admin Controls */}
      {isAdminMode && (
        <section className="py-6 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Panel de Administración</h2>
              <Button variant="primary" onClick={() => setShowAddForm(true)}>
                <i className="ri-add-line mr-2"></i>
                Agregar Producto
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium cursor-pointer whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-pink-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-500 mb-2">No hay productos en esta categoría</h3>
              {isAdminMode && (
                <Button variant="primary" onClick={() => setShowAddForm(true)}>
                  Agregar Primer Producto
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-product-shop>
              {filteredProducts.map((product) => {
                const ProductCard = () => {
                  const [cardImageIndex, setCardImageIndex] = useState(0);
                  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
                  
                  return (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="aspect-square overflow-hidden relative group">
                        <img 
                          src={productImages[cardImageIndex]}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Navigation arrows - only show if multiple images */}
                        {productImages.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardImageIndex(prev => 
                                  prev === 0 ? productImages.length - 1 : prev - 1
                                );
                              }}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100"
                            >
                              <i className="ri-arrow-left-line text-lg text-gray-700"></i>
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardImageIndex(prev => 
                                  prev === productImages.length - 1 ? 0 : prev + 1
                                );
                              }}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100"
                            >
                              <i className="ri-arrow-right-line text-lg text-gray-700"></i>
                            </button>
                            
                            {/* Image counter */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              {cardImageIndex + 1} / {productImages.length}
                            </div>
                            
                            {/* Dot indicators */}
                            <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {productImages.map((_: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCardImageIndex(index);
                                  }}
                                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                    cardImageIndex === index 
                                      ? 'bg-pink-500' 
                                      : 'bg-white/70 hover:bg-white'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-pink-500">{product.price}</span>
                        </div>
                        
                        {isAdminMode ? (
                          <div className="flex gap-2">
                            <Button 
                              variant="secondary" 
                              className="flex-1 text-sm"
                              onClick={() => {
                                setEditingProduct(product);
                                setIsEditing(true);
                              }}
                            >
                              <i className="ri-edit-line mr-1"></i>
                              Editar
                            </Button>
                            <Button 
                              variant="secondary" 
                              className="px-3"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <i className="ri-delete-bin-line text-white"></i>
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="primary" 
                            className="w-full"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Ver Detalles
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                };
                
                return <ProductCard key={product.id} />;
              })}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && !isAdminMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setCurrentImageIndex(0);
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
              
              {/* Image Gallery with Navigation */}
              {selectedProduct.images && selectedProduct.images.length > 1 ? (
                <div className="w-full h-96 md:h-[600px] relative bg-gray-50">
                  <img 
                    src={selectedProduct.images[currentImageIndex]}
                    alt={`${selectedProduct.name} ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all"
                  >
                    <i className="ri-arrow-left-line text-2xl text-gray-700"></i>
                  </button>
                  
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all"
                  >
                    <i className="ri-arrow-right-line text-2xl text-gray-700"></i>
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {selectedProduct.images.length}
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {selectedProduct.images.map((_: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                          currentImageIndex === index 
                            ? 'bg-pink-500' 
                            : 'bg-white/70 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 md:h-[600px] flex items-center justify-center bg-gray-50">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Características:</h3>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-2xl sm:text-3xl font-bold text-pink-500 mb-3 sm:mb-0">{selectedProduct.price}</span>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Solicitar Cotización
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Forms */}
      {showAddForm && (
        <ProductForm 
          onSave={handleAddProduct}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {isEditing && editingProduct && (
        <ProductForm 
          product={editingProduct}
          onSave={handleEditProduct}
          onCancel={() => {
            setIsEditing(false);
            setEditingProduct(null);
          }}
        />
      )}

      <Footer />
    </div>
  );
}
