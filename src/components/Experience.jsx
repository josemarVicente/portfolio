import './Experience.css';

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
  return (
    <section className="experience" id="experience">
      <div className="blob blob-2" style={{ left: '40%', right: 'auto', opacity: 0.5 }} />
      <span className="section-label reveal">CAREER & EXPERIENCE</span>
      <h2 className="section-heading reveal">
        My career <span className="accent">&amp;<br />experience</span>
      </h2>

      <div className="timeline">
        <div className="tl-line" />
        <div className="tl-glow-dot" />

        {items.map((item) => (
          <div className={`tl-row${item.dim ? ' tl-dim' : ''}`} key={item.year}>
            <div className="tl-left reveal">
              <p className="tl-role">{item.role}</p>
              <p className="tl-context">{item.context}</p>
            </div>
            <div className="tl-center">
              <span className="tl-year">{item.year}</span>
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
