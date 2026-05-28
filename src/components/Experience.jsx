import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Experience.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, useGSAP);

const items = [
  {
    role: 'Building Something New',
    context: 'Self / Startup',
    year: 'NOW',
    desc: 'Pushing the boundaries of full-stack and mobile development. Exploring new frameworks, open-source contributions, and indie products.',
    dim: false,
  },
  {
    role: 'Full-Stack Developer',
    context: 'Freelance & Projects',
    year: '2024',
    desc: 'Built complete web and mobile applications. Developed RESTful APIs, responsive UIs, and deployed production apps for various clients.',
    dim: false,
  },
  {
    role: 'Frontend Developer',
    context: 'Freelance & Projects',
    year: '2023',
    desc: 'Mastered React, built component libraries, and started exploring backend architecture with Node.js and Express.',
    dim: false,
  },
  {
    role: 'UI Designer',
    context: 'Freelance',
    year: '2022',
    desc: 'Started the journey with graphic and UI design. Built visual identities and discovered a deep passion for building things on the web.',
    dim: true,
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const rowsRef = useRef([]);

  useGSAP(() => {
    // 1. Core tracking line + neon bead track
    gsap.fromTo([lineRef.current, dotRef.current],
      { scaleY: 0, top: '0%' },
      {
        scaleY: 1,
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 35%',
          end: 'bottom 65%',
          scrub: 0.1,
        },
      }
    );

    // 2. Clear content row text fades
    rowsRef.current.forEach((row) => {
      if (!row) return;

      gsap.fromTo(row.querySelectorAll('.reveal'),
        { opacity: 0.05, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section className="experience" id="experience" ref={containerRef}>
      <div className="blob blob-2" style={{ left: '40%', right: 'auto', opacity: 0.5 }} />
      <span className="bg-heading">CAREER & EXPERIENCE</span>

      <div className="timeline">
        {/* Animated progressive line */}
        <div className="tl-line" ref={lineRef} />
        {/* Animated dynamic neon glow dot */}
        <div className="tl-glow-dot" ref={dotRef} />

        {items.map((item, index) => (
          <div
            className={`tl-row${item.dim ? ' tl-dim' : ''}`}
            key={item.year}
            ref={el => rowsRef.current[index] = el}
          >
            <div className="tl-left reveal">
              <p className="tl-role">{item.role}</p>
              <p className="tl-context">{item.context}</p>
              <span className="tl-year">{item.year}</span>
            </div>
            <div className="tl-center">
              {/* Optional: Add anchor intersections later here if needed */}
            </div>
            <div className="tl-right reveal">
              <p className="tl-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
