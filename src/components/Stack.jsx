import './Stack.css';
import { useTranslation } from 'react-i18next';

const stackCategories = [
  {
    category: 'Languages & Core',
    items: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C++',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'PHP',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ]
  },
  {
    category: 'Frameworks & Runtimes',
    items: [
      { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Nest.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
      { name: 'Spring Boot',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'Laravel',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'GSAP',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/greensock/greensock-original.svg' },
    ]
  },
  {
    category: 'Database, Cloud & Tools',
    items: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Firebase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'VS Code',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ]
  }
];

export default function Stack() {
  const { t } = useTranslation();
  // Use a global tracker for layout index calculation to stagger cascade animations flawlessly
  let absoluteIndex = 0;

  return (
    <section className="stack" id="stack">
      <div className="blob blob-1" style={{ left: '50%', transform: 'translateX(-50%)', opacity: 0.35 }} />
      <h2 className="bg-heading">{t('stack.heading')}</h2>

      <div className="stack-container">
        {stackCategories.map((cat) => (
          <div className="stack-category-group" key={cat.category}>
            <h3 className="stack-category-title">
              {cat.category === 'Languages & Core' ? t('stack.categories.core')
                : cat.category === 'Frameworks & Runtimes' ? t('stack.categories.frameworks')
                : t('stack.categories.tools')}
            </h3>
            <div className="stack-grid">
              {cat.items.map((t) => {
                absoluteIndex++;
                return (
                  <div
                    className="stack-item reveal"
                    key={t.name}
                    style={{ transitionDelay: `${absoluteIndex * 30}ms` }}
                  >
                    <img src={t.icon} alt={t.name} onError={(e) => { e.target.style.display = 'none'; }} />
                    <span className="stack-name">{t.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
