import { calculateTax } from "@/lib/hooks/calculateTax";



export async function POST(req:Request){
    if (req.method === 'POST') {
    const { items } = await req.json()
    const  taxCalculation = calculateTax(items);
    console.log(taxCalculation)


}
return new Response('Method Not Allowed', {
    headers: { Allow: 'POST' },
    status: 405
  });
}