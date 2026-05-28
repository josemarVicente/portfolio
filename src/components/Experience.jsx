import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import './Experience.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const rowsRef = useRef([]);
  const { t } = useTranslation();

  useGSAP(() => {
    const timelineEl = containerRef.current?.querySelector('.timeline');
    const baseLineEl = containerRef.current?.querySelector('.tl-line-base');
    const lineEl = lineRef.current;
    const dotEl = dotRef.current;
    if (!timelineEl || !baseLineEl || !lineEl || !dotEl) return;

    // Baseline hidden; fades in/out when entering/leaving section.
    gsap.set([baseLineEl, lineEl, dotEl], { autoAlpha: 0 });
    gsap.set(lineEl, { scaleY: 0, transformOrigin: 'top center' });
    gsap.set(dotEl, { y: 0 });

    const setDotY = gsap.quickSetter(dotEl, 'y', 'px');
    const setLineScale = gsap.quickSetter(lineEl, 'scaleY');

    let travel = 0;
    const recalc = () => {
      // Dot travels from top to bottom of the timeline box.
      travel = Math.max(0, timelineEl.getBoundingClientRect().height);
    };
    recalc();

    const onRefreshInit = () => recalc();
    ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

    const st = ScrollTrigger.create({
      trigger: timelineEl,
      start: 'top 65%',
      end: 'bottom 15%',
      scrub: true,
      invalidateOnRefresh: true,
      onEnter: () => gsap.to([baseLineEl, lineEl, dotEl], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' }),
      onEnterBack: () => gsap.to([baseLineEl, lineEl, dotEl], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' }),
      onLeave: () => gsap.to([baseLineEl, lineEl, dotEl], { autoAlpha: 0, duration: 0.2, overwrite: 'auto' }),
      onLeaveBack: () => gsap.to([baseLineEl, lineEl, dotEl], { autoAlpha: 0, duration: 0.2, overwrite: 'auto' }),
      onUpdate: (self) => {
        // Line trails exactly behind the dot.
        setLineScale(self.progress);
        setDotY(self.progress * travel);
      },
    });

    // 2. Clear content row text fades
    rowsRef.current.forEach((row) => {
      if (!row) return;

      const targets = row.querySelectorAll('.reveal');
      // Ensure text isn't stuck invisible by global `.reveal { opacity: 0 }`
      gsap.set(targets, { opacity: 0.05, y: 10 });

      gsap.fromTo(row.querySelectorAll('.reveal'),
        { opacity: 0.05, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      st.kill();
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
    };
  }, { scope: containerRef });

  return (
    <section className="experience" id="experience" ref={containerRef}>
      <div className="blob blob-2" style={{ left: '40%', right: 'auto', opacity: 0.5 }} />
      <span className="bg-heading">{t('experience.heading')}</span>

      <div className="timeline">
        {/* Animated progressive line */}
        <div className="tl-line-base" aria-hidden="true" />
        <div className="tl-line-fill" ref={lineRef} aria-hidden="true" />
        {/* Animated dynamic neon glow dot */}
        <div className="tl-glow-dot" ref={dotRef} />

        {['njila', 'tchiiwa', 'freelance', 'aliacars', 'montra', 'simutrade'].map((id, index) => (
          <div
            className="tl-row"
            key={id}
            ref={el => rowsRef.current[index] = el}
          >
            <div className="tl-left reveal">
              <p className="tl-role">{t(`experience.items.${id}.role`)}</p>
              <p className="tl-context">{t(`experience.items.${id}.context`)}</p>
              <p className="tl-period">{t(`experience.items.${id}.period`)}</p>
            </div>
            <div className="tl-center">
              {/* Optional: Add anchor intersections later here if needed */}
            </div>
            <div className="tl-right reveal">
              <p className="tl-desc">{t(`experience.items.${id}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
