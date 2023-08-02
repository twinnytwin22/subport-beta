'use client'
export const copyToClipboard = async (string: string) => {
    try {
        await navigator.clipboard.writeText(string);
        console.log(`Text "${string}" copied to clipboard.`);
    } catch (error) {
        console.error('Error copying text to clipboard:', error);
    }
};
