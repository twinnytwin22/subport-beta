"use server";
import { headers } from "next/headers";
const host =
  process?.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "subport.vercel.app";
const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";

type FetchTypes = {
  contractAddress?: string;
  slug?: string;
};

export const refreshCache = async () => {
  try {
    const slug = "twinny-twin-always";
    const contractArray = ["0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e85"];
    const contractAddress = "0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e85";
    const res = await fetch("/api/v1/refreshCache");

    // const res = await fetch('/api/v1/getCollectibles')
    //  const res = await fetch(`/api/v1/getSingleCollectibleBySlug?slug=${slug}`)
    //const res = await readSingleContractURI(contractAddress)
    // const res = await readContractURIs(contractArray)
    const data = await res.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const fetchSingleCollectible = async ({
  contractAddress,
  slug,
}: FetchTypes) => {
  if (contractAddress) {
    try {
      await fetch(`${protocol}://${host}/api/v1/getCollectibles`);
      const res = await fetch(
        `${protocol}://${host}/api/v1/getSingleCollectible?contractAddress=${contractAddress}`
      );

      await new Promise((resolve) => setTimeout(resolve, 5000));
      //  return await res.json()
      return await res.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  if (slug) {
    try {
      await fetch(`${protocol}://${host}//api/v1/getCollectibles`);
      const res = await fetch(
        `${protocol}://${host}//api/v1/getSingleCollectibleBySlug?slug=${slug}`
      );
      const data = res.json();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      //  return await res.json()
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
