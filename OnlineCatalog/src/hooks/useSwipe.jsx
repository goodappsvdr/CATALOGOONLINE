import { useState, useRef } from "react";

const useSwipe = (onSwipe) => {
  const [startX, setStartX] = useState(null);
  const touchRef = useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    touchRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!touchRef.current) return;

    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    // Umbral de detección para el swipe.
    const swipeThreshold = 50;

    if (diffX > swipeThreshold) {
      onSwipe("left");
      touchRef.current = false;
    } else if (diffX < -swipeThreshold) {
      onSwipe("right");
      touchRef.current = false;
    }
  };

  const handleTouchEnd = () => {
    touchRef.current = false;
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useSwipe;
