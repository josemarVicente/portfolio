import './Services.css';

const services = [
  {
    num: '01',
    title: 'FULL-STACK\nDEVELOPMENT',
    sub: 'Modern web development & scalable applications',
    desc: 'Building responsive and performant web applications using React, Next.js, Vue.js, Node.js, and databases. From landing pages to full SaaS products.',
  },
  {
    num: '02',
    title: 'MOBILE\nDEVELOPMENT',
    sub: 'Cross-platform apps with React Native',
    desc: 'Creating smooth, native-feeling mobile experiences for iOS and Android from a single codebase. UI polish, animations, and offline support.',
  },
  {
    num: '03',
    title: 'UI / UX\nDESIGN',
    sub: 'Interface design & design systems',
    desc: 'Creating clean, intentional interfaces that balance aesthetics with usability. Component libraries and accessibility-first thinking.',
  },
  {
    num: '04',
    title: 'API &\nBACKEND',
    sub: 'RESTful & real-time systems',
    desc: 'Architecting APIs, database schemas, authentication flows, and real-time features. Node.js, Laravel, PostgreSQL, Firebase, and cloud deployments.',
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="blob blob-1" style={{ opacity: 0.45 }} />
      <span className="bg-heading reveal">WHAT I DO</span>
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card reveal" key={s.num}>
            <span className="service-num">{s.num}</span>
            <h3 className="service-title">
              {s.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h3>
            <p className="service-sub">{s.sub}</p>
            <p className="service-desc">{s.desc}</p>

          </div>
        ))}
      </div>
    </section>
  );
}
