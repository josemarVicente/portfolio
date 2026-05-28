import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sectionRef  = useRef(null);
  const badgeRef    = useRef(null);
  const headlineRef = useRef(null);
  const bioRowRef   = useRef(null);
  const actionsRef  = useRef(null);
  const { t } = useTranslation();

  useGSAP(() => {
    const els = [badgeRef.current, headlineRef.current, bioRowRef.current, actionsRef.current].filter(Boolean);

    // Baseline state so refresh mid-page doesn't "invert" animations.
    gsap.set(els, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });

    const isNearTop = window.scrollY < 20;
    if (isNearTop) {
      gsap.from(els, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2,
        immediateRender: false,
      });
    }

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
  }, { scope: sectionRef });

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="horizon-container">
        <div className="horizon-curve" />
      </div>

      <div className="hero-container">
        <div className="feature-badge" ref={badgeRef}>
          <span className="badge-tag">{t('hero.badgeTag')}</span>
          <span className="badge-text">{t('hero.badgeText')}</span>
        </div>

        <h1 className="hero-headline" ref={headlineRef}>
          {t('hero.headlineTop')}<br />
          <span className="italic-serif">{t('hero.headlineItalic')}</span>
        </h1>

        <div className="hero-bio-row" ref={bioRowRef}>
          <span>{t('hero.bioHello')}</span>
          <span className=''>{t('hero.bioRole')}</span>
        </div>

        <div className="hero-actions-row" ref={actionsRef}>
          <a href="#contact" className="btn-primary-pill">
            {t('hero.cta')}
            <span className="arrow-circle">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
