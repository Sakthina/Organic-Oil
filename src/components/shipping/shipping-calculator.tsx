import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface ShippingRate {
  service: string;
  price: number;
  duration: string;
}

export function ShippingCalculator() {
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [rates, setRates] = useState<ShippingRate[]>([]);

  const calculateShipping = () => {
    // Simulate API call for shipping rates
    const mockRates: ShippingRate[] = [
      { service: 'Express', price: 25.99, duration: '2-3 days' },
      { service: 'Standard', price: 12.99, duration: '5-7 days' },
      { service: 'Economy', price: 8.99, duration: '7-10 days' },
    ];
    setRates(mockRates);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Shipping Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <Input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
          />
        </div>

        <Button onClick={calculateShipping} className="w-full">
          Calculate Shipping
        </Button>

        {rates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            {rates.map((rate) => (
              <div
                key={rate.service}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{rate.service}</h3>
                    <p className="text-sm text-gray-500">{rate.duration}</p>
                  </div>
                  <span className="font-bold">${rate.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}