import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const LANGUAGES = [
  { code: 'pt', flag: '🇵🇹', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [compactLang, setCompactLang] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const update = () => setCompactLang(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const links = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="nav-logo">
        <img src="/logo.png" alt="Logo" className="nav-logo-img" />
      </a>
      <span className="nav-email">josemaralessio@gmail.com</span>
      <div className="nav-right">
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <label className={`nav-lang${compactLang ? ' nav-lang--compact' : ''}`} aria-label="Language">
          <select
            value={i18n.resolvedLanguage || i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            {LANGUAGES.map(({ code, flag, label }) => (
              <option key={code} value={code}>
                {compactLang ? flag : `${flag} ${label}`}
              </option>
            ))}
          </select>
        </label>
      </div>
    </nav>
  );
}
