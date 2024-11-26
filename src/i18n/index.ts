import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'nav.home': 'Home',
      'nav.products': 'Products',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.title': 'Pure Organic Oils from India',
      'hero.subtitle': 'Experience the finest quality organic oils, sourced directly from Indian farmers and delivered worldwide.',
      'features.shipping': 'Global Shipping',
      'features.delivery': 'Fast Delivery',
      'features.support': '24/7 AI Support',
    },
  },
  hi: {
    translation: {
      'nav.home': 'होम',
      'nav.products': 'उत्पाद',
      'nav.about': 'हमारे बारे में',
      'nav.contact': 'संपर्क करें',
      'hero.title': 'भारत से शुद्ध जैविक तेल',
      'hero.subtitle': 'भारतीय किसानों से सीधे सोर्स किए गए और दुनिया भर में वितरित सर्वोत्तम गुणवत्ता वाले जैविक तेलों का अनुभव करें।',
      'features.shipping': 'वैश्विक शिपिंग',
      'features.delivery': 'तेज़ डिलीवरी',
      'features.support': '24/7 एआई सहायता',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;