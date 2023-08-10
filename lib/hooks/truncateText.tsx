interface TruncatedText {
    text: string
    maxLength: number
}

export function truncateText({ text, maxLength }: TruncatedText): string {
    if (text?.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
export const ScrollingTruncatedText: React.FC<TruncatedText> = ({ text, maxLength }) => {
    // const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

    return (
        <div className="scrolling-text-container w-40 pr-4">

            <div className={`scrolling-text w-40 pr-8 max-w-[160px] whitespace-nowrap overflow-hidden  mx-auto  ${text.length > maxLength ? 'scroll-text' : ''}`}>
                {text}
            </div>
        </div>
    );
};