'use client';
import { useEffect, useRef } from 'react';

const StarRatingComponent: React.FC<{ rating: number }> = ({ rating }) => {
  const starRatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (starRatingRef.current) {
      const starRatingElement = starRatingRef.current;

      // Calculate the number of full stars (whole number part of the rating)
      const fullStars = Math.floor(rating);

      // Calculate the width of the fractional star (decimal part of the rating)
      const fractionalStarWidth = (rating - fullStars) * 100;

      // Generate full star SVG elements
      for (let i = 0; i < fullStars; i++) {
        const svg = document.createElement('svg');
        svg.setAttribute('aria-hidden', 'true');
        svg.className = 'w-5 h-5 text-yellow-400';
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.innerHTML =
          '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />';
        starRatingElement.appendChild(svg);
      }

      // Generate fractional star SVG element (if applicable)
      if (fractionalStarWidth > 0) {
        const fractionalSvg = document.createElement('svg');
        fractionalSvg.setAttribute('aria-hidden', 'true');
        fractionalSvg.className = 'w-5 h-5 text-yellow-400';
        fractionalSvg.setAttribute('fill', 'currentColor');
        fractionalSvg.setAttribute('viewBox', '0 0 20 20');
        fractionalSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        fractionalSvg.innerHTML = `<mask id="fractionalMask">
          <rect x="0" y="0" width="${fractionalStarWidth}%" height="100%" fill="white" />
        </mask>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" mask="url(#fractionalMask)" />`;
        starRatingElement.appendChild(fractionalSvg);
      }

      // Add the rating text
      const ratingText = document.createElement('span');
      ratingText.className = 'ml-1 text-zinc-500 dark:text-zinc-400';
      ratingText.innerText = rating.toFixed(1); // Limit decimal places to one
      starRatingElement.appendChild(ratingText);
    }
  }, [rating]);

  return (
    <div className="flex items-center" ref={starRatingRef}>
      {/* Content will be dynamically generated here */}
    </div>
  );
};

export default StarRatingComponent;
