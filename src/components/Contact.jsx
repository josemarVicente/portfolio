import './Contact.css';
import { Trans, useTranslation } from 'react-i18next';

const socials = [
  { label: 'Github',    href: 'https://github.com/josemarVicente' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/josemar-vicente-984642261' },
];

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="contact" id="contact">
      <div className="blob blob-1" style={{ opacity: 0.35, right: 0, top: 0 }} />

      <h2 className="italic-serif bg-heading reveal">
        {t('contact.heading')}
      </h2>

      <div className="contact-grid">
        <div className="contact-col reveal">
          <span className="contact-col-label">{t('contact.emailLabel')}</span>
          <p className="contact-value">josemaralessio@gmail.com</p>
          <p className="contact-note">{t('contact.emailNote')}</p>
        </div>
        <div className="contact-col reveal">
          <span className="contact-col-label">{t('contact.locationLabel')}</span>
          <p className="contact-value">{t('contact.locationValue')}</p>
          <p className="contact-note">{t('contact.locationNote')}</p>
        </div>
        <div className="contact-col reveal">
          <span className="contact-col-label">{t('contact.socialLabel')}</span>
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
        <p className="credits">
          <Trans i18nKey="contact.credits" />
        </p>
        <span className="copy-year">&#169; 2026</span>
      </div>
    </section>
  );
}
