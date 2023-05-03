import React from "react";
import { AuthOptions } from "next-auth";
import Account from "ui/User/Account";
import { getSession, useSession } from "next-auth/react";
import { useSupaUser } from "lib/supaUser";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "pages/api/auth/[...nextauth]";
async function page(props: any) {
const authOption = getAuthOptions()
const session = await getServerSession(authOption)
console.log(session , 'session')

return (
<div className="w-full h-[60vh] flex items-center justify-center">
<Account/>
</div> 
)
}
export default page;
