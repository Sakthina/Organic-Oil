import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

interface Message {
  text: string;
  isBot: boolean;
}

const chatbotResponses = {
  greetings: [
    "Hello! I'm your OrganicOils assistant. How can I help you today?",
    "Welcome to OrganicOils! Looking for specific oil recommendations?",
    "Hi there! I can help you find the perfect organic oil for your needs.",
  ],
  farewell: [
    "Thank you for chatting! Feel free to return if you have more questions.",
    "Have a great day! Don't hesitate to ask if you need anything else.",
    "Goodbye! Remember, we're here 24/7 to assist you.",
  ],
  help: [
    "I can help you with:\n- Product information and prices\n- Shipping details\n- Product recommendations\n- Usage guidelines\nWhat would you like to know?",
  ],
  shipping: [
    "We offer worldwide shipping! Delivery times:\n- India: 2-3 business days\n- Asia: 3-5 business days\n- Europe & USA: 5-7 business days\n- Rest of World: 7-10 business days",
    "Shipping costs vary by location. Would you like a specific shipping quote?",
  ],
  quality: [
    "All our oils are certified organic and undergo strict quality testing. Each batch is tested for purity and authenticity.",
    "We maintain the highest quality standards with traditional cold-pressing techniques and work directly with certified organic farmers.",
  ],
  default: [
    "I'm not sure I understood that. Could you please rephrase your question?",
    "I'd be happy to help, but could you provide more details about what you're looking for?",
  ]
};

const findProduct = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.find(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

const generateResponse = (input: string): string => {
  const query = input.toLowerCase();

  // Check for greetings
  if (query.match(/^(hi|hello|hey|greetings)/i)) {
    return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
  }

  // Check for goodbyes
  if (query.match(/^(bye|goodbye|see you|thanks|thank you)/i)) {
    return chatbotResponses.farewell[Math.floor(Math.random() * chatbotResponses.farewell.length)];
  }

  // Check for help request
  if (query.match(/^(help|what can you do|assist)/i)) {
    return chatbotResponses.help[0];
  }

  // Check for shipping questions
  if (query.includes('shipping') || query.includes('delivery') || query.includes('time')) {
    return chatbotResponses.shipping[0];
  }

  // Check for quality questions
  if (query.includes('quality') || query.includes('organic') || query.includes('certification')) {
    return chatbotResponses.quality[0];
  }

  // Check for product information
  const product = findProduct(query);
  if (product) {
    return `${product.name}:\n` +
           `Price: ${formatPrice(product.price)}\n` +
           `Description: ${product.description}\n` +
           `Origin: ${product.origin}\n` +
           `Benefits: ${product.benefits.join(', ')}\n` +
           `Best For: This oil is particularly popular in ${product.origin} and is excellent for ${product.benefits[0].toLowerCase()}.`;
  }

  // Check for specific oil recommendations
  if (query.includes('recommend') || query.includes('suggestion')) {
    if (query.includes('cooking')) {
      return "For cooking, I recommend our Mustard Oil from Bengal or Coconut Oil from Kerala. Both are excellent for high-temperature cooking and add authentic flavor to dishes.";
    }
    if (query.includes('skin') || query.includes('face')) {
      return "For skincare, our Almond Oil and Neem Oil are excellent choices. Almond Oil is great for gentle moisturizing, while Neem Oil has natural antibacterial properties.";
    }
    if (query.includes('hair')) {
      return "For hair care, I highly recommend our Coconut Oil or Castor Oil. Both are excellent for promoting hair growth and maintaining scalp health.";
    }
  }

  return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: chatbotResponses.greetings[0], isBot: true },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full p-4 bg-emerald-600 hover:bg-emerald-700 shadow-lg"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl border"
          >
            <div className="p-4 border-b flex justify-between items-center bg-emerald-50">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-900">AI Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="hover:bg-emerald-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isBot
                        ? 'bg-emerald-50 text-gray-800'
                        : 'bg-emerald-600 text-white'
                    }`}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}