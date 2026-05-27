import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef  = useRef(null);
  const badgeRef    = useRef(null);
  const headlineRef = useRef(null);
  const bioRowRef   = useRef(null);
  const actionsRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([badgeRef.current, headlineRef.current, bioRowRef.current, actionsRef.current], {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(badgeRef.current,    { y: -30, opacity: 0 }, 0)
        .to(headlineRef.current, { y: -50, opacity: 0.15 }, 0)
        .to(bioRowRef.current,   { scale: 0.95, opacity: 0 }, 0)
        .to(actionsRef.current,  { y: 30, opacity: 0 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="horizon-container">
        <div className="horizon-curve" />
      </div>

      <div className="hero-container">
        <div className="feature-badge" ref={badgeRef}>
          <span className="badge-tag">New</span>
          <span className="badge-text">Building Tchiiwa Learn — Version 2.0 incoming</span>
        </div>

        <h1 className="hero-headline" ref={headlineRef}>
          Code that feels designed.<br />
          <span className="italic-serif">Engineering that actually ships.</span>
        </h1>

        <div className="hero-bio-row" ref={bioRowRef}>
          <span>Hi, I'm Josemar Vicente,</span>
          <span className=''>a Full Stack Developer</span>
        </div>

        <div className="hero-actions-row" ref={actionsRef}>
          <a href="#contact" className="btn-primary-pill">
            Let's Connect
            <span className="arrow-circle">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
