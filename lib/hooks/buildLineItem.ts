export const buildLineItem = (item: any) => {
    return {
      amount: item.amount, // Amount in cents
      reference: item.id, // Unique reference for the item in the scope of the calculation
    };
  };