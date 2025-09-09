import { FC, useState, useMemo } from 'react';

import { CONTACTS } from '@/constants';
import { useTranslation } from '@/hooks';
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon } from '@/icons';
import { getExperienceYears, getLeadedProjects } from '@/utils';

import s from './s.module.styl';

export const HeaderCard: FC = () => {
  const { t } = useTranslation();

  const [showImage, setShowImage] = useState(false);

  const firstLetter = 'V';

  const { expYears, leadedProjects } = useMemo(
    () => ({
      expYears: getExperienceYears(),
      leadedProjects: getLeadedProjects(),
    }),
    [],
  );

  // Static skeleton matching the PDF header; replace texts later by i18n/data if needed
  return (
    <section className={s.wrapper}>
      <div className={s.photo}>
        {!showImage && <div className={s.placeholder}>{firstLetter}</div>}
        <img
          src="/images/photos/vest_side.jpg"
          alt="avatar"
          onLoad={() => setShowImage(true)}
          onError={() => setShowImage(false)}
          style={{ display: showImage ? 'block' : 'none' }}
        />
      </div>
      <div className={s.titleBlock}>
        <h1 className={s.name}>{t('profile.name')}</h1>
        <div className={s.role}>Senior Frontend Engineer</div>
        <p className={s.summary}>
          {t('profile.cvBigDescription', {
            expYears,
            leadedProjects,
          })}
        </p>
      </div>
      <div className={s.contacts}>
        <span className={s.contact}>
          <MailIcon />
          {CONTACTS.mail}
        </span>
        <span className={s.contact}>
          <TelegramIcon monochrome />
          {CONTACTS.phone}
        </span>
        <span className={s.contact}>
          <LinkedinIcon monochrome size="16" /> &nbsp;{CONTACTS.linkedin}
        </span>
        <span className={s.contact}>
          <GithubIcon size="24" />
          {CONTACTS.github}
        </span>
      </div>
    </section>
  );
};
