export const combineAndSortData = (request1Data: any, request2Data: any) => {
    // Check if request1Data is an array, if not, convert it into an array
    const arrayData1 = Array.isArray(request1Data) ? request1Data : [request1Data];

    // Check if request2Data is an array, if not, convert it into an array
    const arrayData2 = Array.isArray(request2Data) ? request2Data : [request2Data];

    // Combine the data from both requests
    const combinedData: any = [...arrayData1, ...arrayData2];

    // Map and extract the required fields
    const mappedData: any = combinedData.map((item: any) => {
        if (item?.title) {
            // This is an event item
            return {
                title: item.title,
                created_at: new Date(item.created_at).getTime(),
                slug: item.slug,
                type: 'event',
                user_id: item.user_id, // We'll add a type field to distinguish between events and collectibles
                data: item
            };
        } else if (item?.drop.title) {
            // This is a collectible item
            return {
                title: item.drop.title,
                created_at: new Date(item.drop.created_at).getTime(),
                slug: item.drop.slug,
                type: 'collectible', // We'll add a type field to distinguish between events and collectibles
                user_id: item.drop.user_id,// We'll add a type field to distinguish between events and collectibles
                data: item
            };
        }
        return null; // If the item doesn't have a title or name, we'll skip it
    });

    // Remove null entries from mappedData array
    const filteredData = mappedData.filter((item: any) => item !== null);

    // Sort the data by the 'created_at' field in descending order (most recent first)
    filteredData.sort((a: any, b: any) => b.created_at - a.created_at);

    return filteredData;
};