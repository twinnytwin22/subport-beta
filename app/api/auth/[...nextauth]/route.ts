import { getAuthOptions } from "lib/auth";
import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = getAuthOptions();

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

//export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//    const authOptions: NextAuthOptions = getAuthOptions();

//  return await NextAuth(req, res, authOptions);
// }
