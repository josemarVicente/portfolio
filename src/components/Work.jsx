import './Work.css';

// Replace with your actual project data and images
const projects = [
  {
    num: '01',
    title: 'Project Alpha',
    category: 'Web App',
    tools: 'Next.js, TypeScript, Tailwind, Supabase, Vercel',
    // image: alphaImg,
  },
  {
    num: '02',
    title: 'Project Beta',
    category: 'Mobile App',
    tools: 'React Native, Expo, Node.js, PostgreSQL, Stripe',
    // image: betaImg,
  },
  {
    num: '03',
    title: 'Project Gamma',
    category: 'Dashboard',
    tools: 'React, D3.js, FastAPI, Redis, Docker, AWS',
    // image: gammaImg,
  },
];

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="work-header">
        <span className="section-label reveal">MY WORK</span>
        <h2 className="section-heading reveal">
          Selected<br />Projects
        </h2>
      </div>
      <div className="work-cols">
        {projects.map((p) => (
          <div className="work-col reveal" key={p.num}>
            <div className="work-num">{p.num}</div>
            <div className="work-title-row">
              <span className="work-title">{p.title}</span>
              <span className="work-cat">{p.category}</span>
            </div>
            <span className="work-tools-label">Tools and features</span>
            <p className="work-tools">{p.tools}</p>
            {p.image
              ? <img src={p.image} alt={p.title} className="work-img" />
              : <div className="work-img-placeholder">Project screenshot</div>
            }
          </div>
        ))}
      </div>
    </section>
  );
}
