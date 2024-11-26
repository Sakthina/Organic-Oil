import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components/layout/navbar';
import { ProductsPage } from './pages/Products';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { CheckoutPage } from './pages/Checkout';
import { AuthForm } from './components/auth/auth-form';
import { AIChat } from './components/chat/ai-chat';
import { useTranslation } from 'react-i18next';
import './i18n';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
          <div className="fixed inset-0 -z-10">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover opacity-20"
              poster="https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-drops-of-water-falling-in-slow-motion-18310-large.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <Navbar />

          <main className="container mx-auto px-4 pt-20 pb-12">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/auth" element={<AuthForm />} />
            </Routes>
          </main>

          <AIChat />
          <ToastContainer position="bottom-right" />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;