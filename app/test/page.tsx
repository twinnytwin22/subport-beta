'use client'
import React from "react";
import Account from "ui/User/Account";
function page(props: any) {
  console.log(props, 'session')

return (
<div className="w-full h-[60vh] flex items-center justify-center">
<Account/>
</div> 
)
}
export default page;
