import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Track target (mouse) and current (lerp) coordinates
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };

      // Dot snaps instantly using transform for maximum performance
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      // Elastic lerp tracking formula
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * 0.12;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Hover Event Handlers via Class Toggles
    const handleGrow = () => ringRef.current?.classList.add('is-hovered');
    const handleShrink = () => ringRef.current?.classList.remove('is-hovered');

    // Attach listeners
    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(animate);

    const interactiveElements = document.querySelectorAll('a, button, .work-col, .service-card, .stack-item');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleGrow);
      el.addEventListener('mouseleave', handleShrink);
    });

    // Complete cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleGrow);
        el.removeEventListener('mouseleave', handleShrink);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
