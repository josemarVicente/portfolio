import './About.css';

// import photo from '../assets/your-photo.jpg';
const photo = null;

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-photo-wrap reveal">
        {photo
          ? <img src={photo} alt="About" className="about-photo" />
          : <div className="about-photo-placeholder">Your photo</div>
        }
      </div>
      <div className="about-content">
        <span className="section-label reveal">ABOUT ME</span>
        <p className="about-text reveal">
          I am a <strong>self-taught Full-Stack &amp; Mobile Developer</strong> based in [Your City].
          I build modern web applications and mobile experiences that are fast, accessible,
          and meticulously crafted. My expertise spans <strong>React, Next.js, Node.js,
          React Native</strong>, and cloud infrastructure.
          <br /><br />
          Currently focused on building <strong>products that ship</strong> — clean
          architecture, great UX, no fluff.
          <br /><br />
          Code is craft. Performance is design.
        </p>
      </div>
    </section>
  );
}
