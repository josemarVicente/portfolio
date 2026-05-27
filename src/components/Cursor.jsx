import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // grow ring on interactive elements
    const grow = () => {
      if (ringRef.current) {
        ringRef.current.style.width  = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.borderColor = 'rgba(124,58,237,0.5)';
      }
    };
    const shrink = () => {
      if (ringRef.current) {
        ringRef.current.style.width  = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'rgba(255,255,255,0.25)';
      }
    };
    const targets = document.querySelectorAll('a, button, .work-col, .service-card, .stack-item');
    targets.forEach((el) => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
