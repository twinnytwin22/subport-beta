import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const creation = await req.body
    console.log(creation)
    res.status(200).json({ message: "Your collectible is being created" });
    return creation
} 