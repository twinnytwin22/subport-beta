import Stripe from 'stripe';

const x = process.env.STRIPE_SECRET_KEY_LIVE! ?? process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY! ?? process.env.STRIPE_SECRET_KEY! ??''


// Ensure the environment variables are loaded
const getStripeSecretKey = () => { 

  if (x as string) {
return x as string }

  throw new Error('Stripe secret key is not defined. Please check your environment variables.');


}



export const stripe = new Stripe(getStripeSecretKey());
