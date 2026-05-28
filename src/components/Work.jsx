import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import './Work.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  { num: '01', title: 'Project Alpha',   category: 'Web App',       tools: 'Next.js, TypeScript, Tailwind, Supabase, Vercel' },
  { num: '02', title: 'Project Beta',    category: 'Mobile App',    tools: 'React Native, Expo, Node.js, PostgreSQL, Stripe' },
  { num: '03', title: 'Project Gamma',   category: 'Dashboard',     tools: 'React, D3.js, FastAPI, Redis, Docker, AWS' },
  { num: '04', title: 'Project Delta',   category: 'E-Commerce',    tools: 'Shopify, Liquid, GraphQL, Klaviyo, Cloudflare' },
  { num: '05', title: 'Project Epsilon', category: 'Design System', tools: 'Figma, Storybook, Radix UI, CSS Modules, Chromatic' },
  { num: '06', title: 'Project Zeta',    category: 'AI Platform',   tools: 'Python, LangChain, FastAPI, Pinecone, OpenAI, GCP' },
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
        {projects.map((p) => (
          <div className="work-col" key={p.num}>
            <div className="work-num">{p.num}</div>
            <div className="work-title-row">
              <span className="work-title">{p.title}</span>
              <span className="work-cat">{p.category}</span>
            </div>
            <span className="work-tools-label">{t('work.toolsLabel')}</span>
            <p className="work-tools">{p.tools}</p>
            <div className="work-img-placeholder">{t('work.imagePlaceholder')}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
