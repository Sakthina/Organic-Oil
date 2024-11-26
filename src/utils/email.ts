import emailjs from 'emailjs-com';
import { emailConfig } from '@/lib/email-config';

// Add rate limiting
let lastEmailSent = 0;
const EMAIL_RATE_LIMIT = 1000; // 1 second between emails

export const sendOrderConfirmationEmail = async (
  customerEmail: string,
  orderDetails: {
    orderNumber: string;
    total: number;
    currency: string;
    items: Array<{ name: string; quantity: number; price: number }>;
  }
) => {
  try {
    // Check rate limit
    const now = Date.now();
    if (now - lastEmailSent < EMAIL_RATE_LIMIT) {
      throw new Error('Please wait a moment before sending another email');
    }

    const templateParams = {
      to_email: 'sakthinathan.s.mech.2021@snsce.ac.in',
      from_name: 'OrganicOils',
      to_name: customerEmail,
      order_number: orderDetails.orderNumber,
      order_total: `${orderDetails.currency} ${orderDetails.total.toFixed(2)}`,
      order_items: orderDetails.items
        .map(item => `${item.name} x${item.quantity}`)
        .join(', '),
      message: `New order received from ${customerEmail}!`,
    };

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams
    );

    lastEmailSent = now;
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
    return { 
      success: false, 
      error: 'Failed to send email notification' 
    };
  }
};