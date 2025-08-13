import { FC } from 'react';

import s from './s.module.styl';

type TProps = {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  projects?: string[];
  image?: string;
};

export const ExpierienceItem: FC<TProps> = ({
  title,
  company,
  period,
  location,
  description,
  projects = [],
  image,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.headerRow}>
        <div className={s.leftSide}>
          <div className={s.image}>{image && <img src={image} alt={company} />}</div>
          <div className={s.leftTitle}>
            <div className={s.position}>{title}</div>
            <div className={s.company}>{company}</div>
          </div>
        </div>
        <div className={s.rightMeta}>
          <div className={s.location}>{location}</div>
        </div>
      </div>
      <div className={s.subRow}>
        <div className={s.period}>{period}</div>
        {projects.length > 0 && (
          <ul className={s.projects}>
            {projects.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>

      <div className={s.description}>{description}</div>
    </div>
  );
};
