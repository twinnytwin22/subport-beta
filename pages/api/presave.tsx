'use client'
import { getSession } from "next-auth/react";

export default async function handler(req: any, res:any) {
  const session = await getSession({ req });
  if (session) {
    // Save the user's pre-save data to a database
    const { song } = req.body;
    const userEmail = session.user.email;
    // Save the user's pre-save data to a database
    // ...
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
  return
}
