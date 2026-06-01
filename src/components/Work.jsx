import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import './Work.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    num: '01',
    title: 'Njila',
    category: 'Mobility Ecosystem',
    tools: 'Two mobile apps and a microservices backend. NestJS, Java, React Native, Next.js',
    image: '/work/njila.png',
    uri: 'https://njila-landing-page-lake.vercel.app/',
  },
  {
    num: '02',
    title: 'SimuTrade',
    category: 'Trading Simulator',
    tools: 'Paper trading platform. Laravel, Next.js, Docker, Render',
    image: '/work/simutrade.png',
    uri: 'https://simutrade-psi.vercel.app/',
  },
  {
    num: '03',
    title: 'Montra',
    category: 'Mobile App',
    tools: 'Budget tracking with offline-first architecture. React Native, Expo, Supabase',
    image: '/work/montra.png',
  },
  {
    num: '04',
    title: 'Aliacars',
    category: 'Car Rental Ecosystem',
    tools: 'Two mobile apps and an internal management system. NestJS, React Native, Next.js',
    image: '/work/aliacars.png',
  },
  {
    num: '05',
    title: 'Xora',
    category: 'SaaS Landing',
    tools: 'Marketing site for an AI video editor. Next.js, GSAP',
    image: '/work/xora.png',
    uri: 'https://xora-saas-landing-page-pearl.vercel.app/',
  },
  {
    num: '06',
    title: 'Angola Camp Area',
    category: 'Landing Page',
    tools: 'Camping utility app — discover known camp locations. React',
    image: '/work/angolacamparea.png',
    uri: 'https://angolacamparea.vercel.app/',
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const { t } = useTranslation();

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px)', () => {
      gsap.set('.work-col', { opacity: 1, y: 0 });

      let totalScroll = 0;
      /** @type {number[]} */
      let snapPoints = [0, 1];

      function recalc() {
        totalScroll = Math.max(0, track.scrollWidth - window.innerWidth);

        const cols = Array.from(track.querySelectorAll('.work-col'));
        if (totalScroll <= 0 || cols.length < 2) {
          snapPoints = [0, 1];
          return;
        }

        // Progress points (0..1) that align each card to the left edge,
        // clamped to totalScroll to avoid many points collapsing at 1.
        snapPoints = cols
          .map((el) => Math.min(el.offsetLeft, totalScroll) / totalScroll)
          .map((p) => Math.min(1, Math.max(0, p)))
          .sort((a, b) => a - b)
          .filter((p, i, arr) => (i === 0 ? true : p - arr[i - 1] > 1e-4));
      }

      recalc();
      const onRefreshInit = () => recalc();
      ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

      const tween = gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll * 1.6}`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => gsap.utils.snap(snapPoints, value),
            delay: 0.12,
            duration: { min: 0.18, max: 0.45 },
            ease: 'power2.out',
          },
        },
      });

      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      };
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="work-header">
        <h2 className="bg-heading" style={{ textAlign: 'center'}}>
          {t('work.heading')}
        </h2>
      </div>

      <div className="work-cols" ref={trackRef}>
        {projects.map((p) => {
          const media = p.image ? (
            <img src={p.image} alt={p.title} className="work-img" />
          ) : (
            <div className="work-img-placeholder">{t('work.imagePlaceholder')}</div>
          );

          return (
            <div className="work-col" key={p.num}>
              <div className="work-num">{p.num}</div>
              <div className="work-title-row">
                {p.uri ? (
                  <a
                    href={p.uri}
                    className="work-title work-title-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.title}
                  </a>
                ) : (
                  <span className="work-title">{p.title}</span>
                )}
                <span className="work-cat">{p.category}</span>
              </div>
              <span className="work-tools-label">{t('work.toolsLabel')}</span>
              <p className="work-tools">{p.tools}</p>
              {p.uri ? (
                <a
                  href={p.uri}
                  className="work-media-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.title}
                >
                  {media}
                </a>
              ) : (
                media
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
