'use client'
import { useEffect } from 'react';

export function handleOutsideClick({ ref, callback }: any) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const removeListener = () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return removeListener;
  }, [ref, callback]);
}
