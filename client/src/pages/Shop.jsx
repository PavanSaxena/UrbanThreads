import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, openCart } = useCart();

  // Fetch products from backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5001/api/products');
        const result = await res.json();
        // result.data is the array of products
        setProducts(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Dresses', 'Activewear', 'Sweaters'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    openCart();
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isOnSale && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
          >
            <Plus className="h-4 w-4" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
            <span className="text-sm text-gray-400 dark:text-gray-500">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Size and Color Options */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Sizes:</span>
            <div className="flex space-x-1">
              {product.sizes?.slice(0, 4).map((size, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                  {size}
                </span>
              ))}
              {product.sizes?.length > 4 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">+{product.sizes.length - 4}</span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Colors:</span>
            <div className="flex space-x-1">
              {product.colors?.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                  style={{
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'gray' ? '#6b7280' :
                                   color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                   color.toLowerCase() === 'blue' ? '#3b82f6' :
                                   color.toLowerCase() === 'red' ? '#ef4444' :
                                   color.toLowerCase() === 'burgundy' ? '#7c2d12' :
                                   color.toLowerCase() === 'cream' ? '#fef3c7' :
                                   color.toLowerCase() === 'camel' ? '#d2b48c' :
                                   '#6b7280'
                  }}
                  title={color}
                />
              ))}
              {product.colors?.length > 3 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shop Our Collection
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Discover premium clothing that defines your unique style
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.productId || product._id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;