import { FC } from 'react';

import s from './s.module.styl';

type TProps = {
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  companyDescription?: string;
  description?: string;
};

export const SectionItem: FC<TProps> = ({
  title,
  subtitle,
  dates,
  location,
  companyDescription,
  description,
}) => {
  return (
    <div className={s.sectionItem}>
      <div className={s.title}>{title}</div>
      <div className={s.subtitle}>{subtitle}</div>
      <div className={s.dateLocation}>
        <div className={s.dates}>{dates}</div>
        <div className={s.location}>{location}</div>
      </div>
      {companyDescription && <div className={s.companyDescription}>{companyDescription}</div>}
      {description && <div className={s.description}>{description}</div>}
    </div>
  );
};
