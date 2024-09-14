// hooks/useOutsideClick.ts
import { useEffect } from 'react';
// Custom hook to detect clicks outside a component
export const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
