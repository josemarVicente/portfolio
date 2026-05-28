import './Services.css';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    { num: '01', key: 'fullstack' },
    { num: '02', key: 'mobile' },
    { num: '03', key: 'uiux' },
    { num: '04', key: 'backend' },
  ].map((s) => ({
    num: s.num,
    title: t(`services.items.${s.key}.title`),
    sub: t(`services.items.${s.key}.sub`),
    desc: t(`services.items.${s.key}.desc`),
  }));

  return (
    <section className="services" id="services">
      <div className="blob blob-1" style={{ opacity: 0.45 }} />
      <span className="bg-heading reveal">{t('services.heading')}</span>
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
