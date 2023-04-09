import { getCollections } from "lib/hooks/supaQueries";
import React from "react";
import { RenderMintStatus } from "ui/Cards/MintStatusCard";

async function page() {
  const collections = await getCollections();
  console.log(collections);
return (
<div className="w-full h-[60vh] flex items-center justify-center">
  <RenderMintStatus />
</div> 
)
}
export default page;
