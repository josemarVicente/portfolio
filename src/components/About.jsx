import './About.css';
import { Trans, useTranslation } from 'react-i18next';

// import photo from '../assets/your-photo.jpg';
import photo from '../assets/portrait.webp';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="about" id="about">
      <div className="about-photo-wrap reveal">
        {photo
          ? <img src={photo} alt={t('about.photoAlt')} className="about-photo" />
          : <div className="about-photo-placeholder">{t('about.photoPlaceholder')}</div>
        }
      </div>
      <div className="about-content">
        <span className="section-label reveal">{t('about.label')}</span>
        <p className="about-text reveal">
          <Trans
            i18nKey="about.text"
            components={{
              strong: <strong />,
              br: <br />
            }}
          />
        </p>
      </div>
    </section>
  );
}
