import React from 'react'

function EventDetails({ event, Dates, image }: any) {
    return (
        <div> {/* Event details */}
            <div className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 border shadow mt-8 rounded-md p-8 max-w-screen mx-auto relative z-20">
                <div className="mb-4">
                    <h1 className="text-xl lg:text-2xl font-bold text-white">About this event</h1>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        {event.description}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Category: {event.category}
                        </p>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Ticket Type: {event.ticket_type}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-zinc-600 dark:text-zinc-300">
                        Price: {event.price} {event.currency_type}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        Ticket Quantity: {event.ticket_quantity}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        Ticket Terms: {event.ticket_terms}
                    </p>
                </div>
            </div></div>
    )
}

export default EventDetails