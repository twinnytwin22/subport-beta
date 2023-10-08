import { stripe } from '@/lib/providers/stripe/stripe';
import { NextResponse } from 'next/server';



export async function POST(req:Request,){
    const { name, description, amount, } = await  req.json()
    if (req.method === 'POST') {

        const price = await stripe.products.create({
            name,
            description,
          }).then(product => {
            stripe.prices.create({
              unit_amount: amount,
              currency: 'usd',
              recurring: {
                interval: 'month',
              },
              product: product.id,
            }).then(price => {
              console.log('Success! Here is your starter subscription product id: ' + product.id);
              console.log('Success! Here is your starter subscription price id: ' + price.id);
            })
        })
        return NextResponse.json(price)
    }
    return NextResponse.json('Method Not Allowed', {
        headers: { Allow: 'POST' },
        status: 405
      });}