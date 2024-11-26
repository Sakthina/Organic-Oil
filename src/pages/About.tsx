import { motion } from 'framer-motion';
import { Droplets, Globe, Truck, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">About OrganicOils</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            OrganicOils is India's premier platform for authentic, cold-pressed organic oils,
            connecting traditional Indian oil producers directly with global consumers.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">
                We deliver our premium organic oils to over 100 countries, maintaining
                their quality and authenticity throughout the journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Every product is tested and certified for purity, ensuring you receive
                only the finest organic oils.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-8">
            To bring the finest quality organic oils from Indian farmers to the global
            market while ensuring fair trade practices and sustainable farming methods.
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Process</h2>
          <p className="text-gray-600 mb-8">
            We work directly with farmers who use traditional cold-pressing techniques,
            preserving the natural benefits and healing properties of each oil.
          </p>
        </div>
      </motion.div>
    </div>
  );
}