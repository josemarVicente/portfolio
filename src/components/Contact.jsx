import './Contact.css';

const socials = [
  { label: 'Github',    href: 'https://github.com/josemarVicente' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/josemar-vicente-984642261' },
];

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="blob blob-1" style={{ opacity: 0.35, right: 0, top: 0 }} />

      <h2 className="contact-heading reveal">
        Let's work<br /><span className="accent">together.</span>
      </h2>

      <div className="contact-grid">
        <div className="contact-col reveal">
          <span className="contact-col-label">EMAIL</span>
          <p className="contact-value">josemaralessio@gmail.com</p>
          <p className="contact-note">Available for freelance &amp; full-time</p>
        </div>
        <div className="contact-col reveal">
          <span className="contact-col-label">LOCATION</span>
          <p className="contact-value">Luanda, Angola</p>
          <p className="contact-note">Open to remote worldwide</p>
        </div>
        <div className="contact-col reveal">
          <span className="contact-col-label">SOCIAL</span>
          <ul className="social-list">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href}>{s.label} <span>&#8599;</span></a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="contact-footer">
        <p className="credits">Designed and Developed<br />by Josemar Vicente</p>
        <span className="copy-year">&#169; 2026</span>
      </div>
    </section>
  );
}
