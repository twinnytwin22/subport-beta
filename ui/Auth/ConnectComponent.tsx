import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import addUpdateWallet from 'lib/hooks/functions';


function ConnectComponent() {

   
  
  return (
    <div className="relative flex justify-center items-center content-center">
      <div className="max-w-md md:max-w-lg p-8 bg-zinc-900 border border-zinc-700 rounded-lg shadow">
        <h3 className="mb-3 text-2xl font-bold text-white">
          Connect Your Crypto Wallet
        </h3>
        <p className="mb-4 text-zinc-300">
          Creators need a crypto wallet to securely create their digital collectibles. A crypto wallet is like a digital safe that gives creators full control over their assets and enables them to freely create and trade in the digital world.
        </p>
        <ConnectButton />
      </div>
    </div>
  );
}



export default ConnectComponent;
export function DupConnectComponent() {

   
  
  return (
    <div className="relative flex justify-center items-center content-center">
      <div className="max-w-md md:max-w-lg p-8 bg-zinc-900 border border-zinc-700 rounded-lg shadow">
        <h3 className="mb-3 text-2xl font-bold text-white">
          Hmmm..... Something is wrong.
        </h3>
        <p className="mb-4 text-zinc-300">
This wallet address is associated with another account. Please try a different wallet address or login to the associated account. If you believe this is an error please contact support.        </p>
       
      </div>
    </div>
  );
}