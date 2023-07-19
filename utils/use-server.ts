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
