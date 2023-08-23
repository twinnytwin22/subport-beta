
import { IpfsUploader, ThirdwebStorage } from "@thirdweb-dev/storage";

export const getThirdWebClientId = () => {
    if (process.env.THIRD_WEB_CLIENT_ID as string) {
        return process.env.THIRD_WEB_CLIENT_ID! as string;
    }
    throw new Error("Thirdweb Client Id is not defined");
};

export const getThirdWebSecret = () => {
    if (process.env.THIRD_WEB_SECRET_KEY as string) {
        return process.env.THIRD_WEB_SECRET_KEY! as string;
    }
    throw new Error("Thirdweb Client Id is not defined");
};

const gatewayUrls = {
    'ipfs://': [
        //    "https://subport.infura-ipfs.io/ipfs/",
        "https://ipfs.thirdwebcdn.com/ipfs/",
        "https://gateway.ipfscdn.io/ipfs/",
        "https://cloudflare-ipfs.com/ipfs/",
        "https://ipfs.io/ipfs/",
    ]
}

export const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID! as string
export const secretKey = process.env.THIRDWEB_SECRET_KEY! as string

export const uploader = new IpfsUploader({ clientId, secretKey });
export const storage = new ThirdwebStorage({ uploader, gatewayUrls, clientId: clientId!, secretKey: secretKey! });