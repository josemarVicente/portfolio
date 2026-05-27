import { useEffect, useState } from 'react';
import './Navbar.css';

const links = [
  { label: 'ABOUT',   href: '#about' },
  { label: 'WORK',    href: '#work' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="nav-logo">YN.</a>
      <span className="nav-email">your.email@gmail.com</span>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.label}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
