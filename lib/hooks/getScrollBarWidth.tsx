export function getScrollbarWidth() {
    // Create a div element with a scrollbar
    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    document.body.appendChild(scrollDiv);

    // Calculate the scrollbar width
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Remove the div element
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
}
