// Function to reformat the date
export function reformatDate(dateString: string) {
    const date = new Date(dateString);

    // Full date with month spelled out (e.g., July 29, 2023)
    const fullDate = date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    // Date in the format Month, Day, Year (e.g., July 29, 2023)
    const monthDayYear = date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    // Date in the format MM/DD/YYYY (e.g., 07/29/2023)
    const mmddyyyy = date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3');

    const mmdd = date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',

    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2');

    return { fullDate, monthDayYear, mmddyyyy, mmdd };
}

  // Example usage

