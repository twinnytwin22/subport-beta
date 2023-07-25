import React from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { reformatDate } from "lib/hooks/formatDate";
import { FaBookmark, FaFlag } from "react-icons/fa";
import MinIEventCard from "ui/Cards/Events/MinIEventCard";
export default async function Page({
    params,
}: {
    params: { id: string; slug: string };
}) {
    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/v1/getIRLEvents`, {
        method: "GET",
        cache: "no-store",
    });

    const data = await res.json();

    const { slug, id } = params;

    // Find the event with the matching slug
    const event = data.find((eventItem: any) => eventItem.slug === id);

    if (event) {
        const inputDate = event.date;
        const Dates = reformatDate(inputDate);
        console.log(Dates);

        return (
            <MinIEventCard Dates={Dates} event={event} />
        );
    }
    return null;
}
