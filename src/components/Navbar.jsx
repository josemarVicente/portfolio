import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="nav-logo">YN.</a>
      <span className="nav-email">josemaralessio@gmail.com</span>
      <div className="nav-right">
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <label className="nav-lang" aria-label="Language">
          <select
            value={i18n.resolvedLanguage || i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="pt">🇵🇹 Português</option>
            <option value="en">🇺🇸 English</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
        </label>
      </div>
    </nav>
  );
}
