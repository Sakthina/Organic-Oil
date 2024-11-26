import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/product-card';
import { products } from '@/data/products';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const categories = ['all', 'cooking', 'cosmetic', 'medicinal', 'essential'];
const priceRanges = [
  { min: 0, max: 20, label: 'Under $20' },
  { min: 20, max: 50, label: '$20 - $50' },
  { min: 50, max: Infinity, label: 'Over $50' }
];

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0]>(priceRanges[0]);
  const [recommendations, setRecommendations] = useState<typeof products>([]);
  const [userCountry, setUserCountry] = useState('');

  useEffect(() => {
    // Simulate getting user's country (in production, use a geolocation service)
    const detectCountry = async () => {
      // Simulated API call
      setUserCountry('India');
    };
    detectCountry();
  }, []);

  // AI-based product recommendations
  useEffect(() => {
    const getRecommendations = async () => {
      // Simulate AI recommendations based on user's location and preferences
      const recommendedProducts = products.filter(product => {
        if (userCountry === 'India') {
          return product.category === 'cooking' || product.category === 'medicinal';
        }
        return product.category === 'cosmetic' || product.category === 'essential';
      }).slice(0, 3);
      
      setRecommendations(recommendedProducts);
    };

    if (userCountry) {
      getRecommendations();
    }
  }, [userCountry, selectedCategory]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="capitalize whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-wrap gap-4 items-center">
          <SlidersHorizontal className="h-4 w-4" />
          <div className="flex gap-2">
            {priceRanges.map((range) => (
              <Button
                key={range.label}
                variant={selectedPriceRange === range ? 'default' : 'outline'}
                onClick={() => setSelectedPriceRange(range)}
                className="whitespace-nowrap"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
          <p className="text-gray-600 mb-4">Based on your location: {userCountry}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((product) => (
              <ProductCard key={`rec-${product.id}`} product={product} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}