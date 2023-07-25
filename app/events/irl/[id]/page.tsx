import React from "react";
import { headers } from "next/headers";
import { reformatDate } from "lib/hooks/formatDate";
import { FaBookmark, FaFlag, FaMapPin } from "react-icons/fa";
import Image from "next/image";
import EventHeader from "ui/Sections/Events/EventHeader";
import EventDetails from "ui/Sections/Events/EventDetails";
import EventGoogleMap from "ui/Sections/Events/EventMap";
import { checkUser } from "utils/database";
import { downloadImage } from "lib/hooks/downloadImage";
import { useImagePath } from "lib/constants";
import { FollowButton } from "ui/Buttons/FollowButton";
import EventOrganizer from "ui/Sections/Events/EventOrganizer";
import EventTicketContainer from "ui/Sections/Events/EventTicketContainer";
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
        const user = await checkUser({ id: event.user_id });
        if (user) {
            const inputDate = event.date;
            const Dates = reformatDate(inputDate);
            console.log(Dates);
            const image = event?.image?.replace(
                "ipfs://",
                "https://gateway.ipfscdn.io/ipfs/"
            );


            return user.profile && (
                <div className="min-h-screen h-full mb-40">
                    {/* Header with blurred image */}
                    <EventHeader image={image} Dates={Dates} event={event} />
                    <div className="flex flex-col md:flex-row w-full  space-x-8">
                        <div className="w-full">
                            <EventOrganizer user={user} />
                            <EventDetails image={image} Dates={Dates} event={event} />
                        </div>
                        <div className=" col-span-1 mt-8 w-fit rounded-md  relative">
                            <EventTicketContainer event={event} />

                            <EventGoogleMap lat={0} lng={0} />
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}
