import React, { useEffect, useRef, useState } from "react";

export default function AnimatedStat({ value, label, suffix = '', duration = 1800 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || hasAnimated.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        hasAnimated.current = true;
        let start = 0;
        const end = typeof value === 'number' ? value : parseInt(value.toString().replace(/\D/g, ''));
        const startTime = performance.now();
        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * (end - start) + start);
          setDisplay(current);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplay(end);
          }
        }
        requestAnimationFrame(animate);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [value, duration]);

  return (
    <div className="stat" ref={ref}>
      <h3 className="stat-number">{display}{suffix}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
}
