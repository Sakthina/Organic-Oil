// Initialize EmailJS with your public key
import emailjs from 'emailjs-com';

// Replace with your actual EmailJS public key
const EMAILJS_PUBLIC_KEY = 'BHupbDeT6j3Vjiefo';
const EMAILJS_SERVICE_ID = 'service_bjjrz4q';
const EMAILJS_TEMPLATE_ID = 'template_vxt82oi';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const emailConfig = {
  serviceId: EMAILJS_SERVICE_ID,
  templateId: EMAILJS_TEMPLATE_ID,
};