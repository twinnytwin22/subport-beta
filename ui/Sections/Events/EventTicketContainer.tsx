import React from 'react';

function EventTicketContainer({ event }: any) {
    return (
        <section className="bg-white block dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 w-full border shadow rounded-md p-8 max-w-screen mx-auto relative z-20 mb-8">
            <h1 className="text-xl lg:text-2xl font-bold text-white text-center">Tickets</h1>
            <div className='flex space-x-2 text-center justify-center text-sm mb-2.5'>
                <p>{event.ticket_quantity}&nbsp;  Available</p>
                <p>|</p>
                <p>${event.price}</p>

            </div>
            <div className="flex justify-center"> {/* Added flex and justify-center classes */}

                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs px-4 py-2 rounded-lg outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                >
                    Get Tickets
                </button>
            </div>
        </section>
    );
}

export default EventTicketContainer;
