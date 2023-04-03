import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

function ConnectComponent() {
  return (
    <div className="fixed z-310 top-0 bottom-0 left-0 right-0 flex justify-center items-center content-center md:-mr-32">
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
