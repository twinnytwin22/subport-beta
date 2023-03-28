import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    const creation = await req.body
    console.log(creation)
    res.status(200).json({ message: "Your collectible is being created" });
} 