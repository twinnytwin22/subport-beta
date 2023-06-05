import { Contract } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { Chain } from "./dist/chains";
export declare type SDK = {
  chain: Chain;
  signerOrProvider: Signer | Provider;
  contract: Contract;
};
export declare class SubportSDK {
  chain: Chain;
  signerOrProvider: Signer | Provider;
  contract: Contract;
  constructor(
    chainOrChainId: Chain | number,
    signerOrProvider: Signer | Provider
  );
}
