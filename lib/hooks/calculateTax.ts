import { stripe } from '../providers/stripe/stripe';
import { buildLineItem } from './buildLineItem';
export const calculateTax = async (items: any, currency?: string) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency: currency || 'null',
    customer_details: {
      address: {
        line1: '920 5th Ave',
        city: 'Seattle',
        state: 'WA',
        postal_code: '98104',
        country: 'US'
      },
      address_source: 'shipping'
    },
    line_items: items.map((item: string) => buildLineItem(item))
  });

  return taxCalculation;
};
