import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef   = useRef(null);
  const badgeRef     = useRef(null);
  const headlineRef  = useRef(null);
  const bioRowRef    = useRef(null);
  const actionsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance Animations ──
      gsap.from([badgeRef.current, headlineRef.current, bioRowRef.current, actionsRef.current], {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2
      });

      // ── Scroll-Driven Animations ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // On scroll: Elements glide smoothly apart and fade out
      tl.to(badgeRef.current,    { y: -30, opacity: 0 }, 0)
        .to(headlineRef.current, { y: -50, opacity: 0.15 }, 0)
        .to(bioRowRef.current,   { scale: 0.95, opacity: 0 }, 0)
        .to(actionsRef.current,  { y: 30, opacity: 0 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Pure CSS Atmosphere Layers */}
      <div className="ambient-glow" />
      <div className="horizon-container">
        <div className="horizon-curve" />
      </div>

      <div className="hero-container">
        {/* Top Announcement Tag */}
        <div className="feature-badge" ref={badgeRef}>
          <span className="badge-tag">New</span>
          <span className="badge-text">Building Tchiiwa LMS — Version 2.0 incoming</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="hero-headline" ref={headlineRef}>
          Code that feels designed.<br />
          <span className="italic-serif">Engineering that actually ships.</span>
        </h1>

        {/* Anchor Bio Row with Inline Micro-Avatar */}
        <div className="hero-bio-row" ref={bioRowRef}>
          <span>Hello, I'm Josemar Vicente</span>
          <div className="inline-avatar-wrap">
            {/* When ready, replace the div inside with: <img src={yourPhoto} alt="Josemar" /> */}
            <div className="avatar-placeholder" />
          </div>
          <span>a Full Stack Developer</span>
        </div>

        {/* Interactive CTA Controls */}
        <div className="hero-actions-row" ref={actionsRef}>
          <a href="#contact" className="btn-primary-pill">
            Let's Connect
            <span className="arrow-circle">→</span>
          </a>
          <a href="mailto:hello@yourdomain.com" className="btn-secondary-email">
            <svg className="icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            hello@yourdomain.com
          </a>
        </div>
      </div>
    </section>
  );
}
