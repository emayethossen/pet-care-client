// hooks/useInfiniteScroll.tsx

import { useEffect, useRef } from "react";

const useInfiniteScroll = (callback: () => void, isFetching: boolean) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback(); // Trigger data fetch
        }
      },
      {
        threshold: 1.0, // Load when the element is fully visible
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isFetching, callback]);

  return observerRef;
};

export default useInfiniteScroll;
