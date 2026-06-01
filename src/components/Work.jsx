import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import './Work.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  { id: 'njila', num: '01', image: '/work/njila.png', uri: 'https://njila-landing-page-lake.vercel.app/' },
  { id: 'simutrade', num: '02', image: '/work/simutrade.png', uri: 'https://simutrade-psi.vercel.app/' },
  { id: 'montra', num: '03', image: '/work/montra.png' },
  { id: 'aliacars', num: '04', image: '/work/aliacars.png' },
  { id: 'xora', num: '05', image: '/work/xora.png', uri: 'https://xora-saas-landing-page-pearl.vercel.app/' },
  { id: 'angolacamparea', num: '06', image: '/work/angolacamparea.png', uri: 'https://angolacamparea.vercel.app/' },
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
          const title = t(`work.projects.${p.id}.title`);
          const media = p.image ? (
            <img src={p.image} alt={title} className="work-img" />
          ) : (
            <div className="work-img-placeholder">{t('work.imagePlaceholder')}</div>
          );

          return (
            <div className={`work-col${p.uri ? ' work-col--linked' : ''}`} key={p.id}>
              <div className="work-num">{p.num}</div>
              <div className="work-title-row">
                {p.uri ? (
                  <a
                    href={p.uri}
                    className="work-title work-title-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </a>
                ) : (
                  <span className="work-title">{title}</span>
                )}
              </div>
              <p className="work-subtitle">{t(`work.projects.${p.id}.subtitle`)}</p>
              <span className="work-tech-label">{t('work.techLabel')}</span>
              <p className="work-stack">{t(`work.projects.${p.id}.stack`)}</p>
              {p.uri ? (
                <a
                  href={p.uri}
                  className="work-media-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
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
