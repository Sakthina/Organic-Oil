import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { toast } from 'react-toastify';
import { sendOrderConfirmationEmail } from '@/utils/email';

const currencies = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  INR: 83.12,
  JPY: 110.25,
  AUD: 1.35,
  CAD: 1.27,
  SGD: 1.34,
  AED: 3.67
};

type ShippingInfo = {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [step, setStep] = useState<'shipping' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const baseTotal = getTotal();
  const convertedTotal = baseTotal * currencies[selectedCurrency as keyof typeof currencies];

  const handlePlaceOrder = async () => {
    if (Object.values(shippingInfo).some(value => !value)) {
      toast.error('Please fill in all shipping information');
      return;
    }

    setIsProcessing(true);

    try {
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const { success, error } = await sendOrderConfirmationEmail(shippingInfo.email, {
        orderNumber,
        total: convertedTotal,
        currency: selectedCurrency,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price * currencies[selectedCurrency as keyof typeof currencies]
        }))
      });

      if (success) {
        toast.success('Order confirmation email sent!');
        setStep('confirmation');
      } else {
        toast.warning(`Order placed successfully, but couldn't send confirmation email: ${error}`);
        setStep('confirmation');
      }
    } catch (error) {
      toast.error('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmOrder = () => {
    clearCart();
    toast.success('Thank you for your order!');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          {step === 'shipping' ? 'Checkout' : 'Order Confirmation'}
        </h1>

        {step === 'shipping' ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="address"
                  placeholder="Street Address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="city"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  name="country"
                  placeholder="Country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  required
                />
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>
                      {selectedCurrency} {(item.price * item.quantity * currencies[selectedCurrency as keyof typeof currencies]).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Select Currency</span>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="border rounded-md p-2"
                    >
                      {Object.keys(currencies).map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{selectedCurrency} {convertedTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6" 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
                Thank you for your order!
              </h2>
              <p className="text-gray-600">
                Your order has been received and is being processed.
                A confirmation email has been sent to your email address.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Shipping Details</h3>
                <p>{shippingInfo.name}</p>
                <p>{shippingInfo.address}</p>
                <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
                <p>{shippingInfo.country}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>
                      {selectedCurrency} {(item.price * item.quantity * currencies[selectedCurrency as keyof typeof currencies]).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{selectedCurrency} {convertedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleConfirmOrder}>
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}