import { FC } from 'react';

import { CONTACTS } from '@/constants';

import s from './s.module.styl';

export const HeaderCard: FC = () => {
  // Static skeleton matching the PDF header; replace texts later by i18n/data if needed
  return (
    <section className={s.wrapper}>
      <div className={s.photo}>
        <img src="/images/vest_side.jpg" alt="avatar" />
      </div>
      <div className={s.titleBlock}>
        <h1 className={s.name}>Vadim Rasstrigin</h1>
        <div className={s.role}>Senior Frontend Engineer</div>
        <p className={s.summary}>
          6 years of frontend development experience. I have played a significant role in the
          development of a large international online store focusing on the USA market, as well as
          large-scale federal projects in the construction and car industries.
        </p>
        <div className={s.contacts}>
          <span className={s.contact}>{CONTACTS.mail}</span>
          <span className={s.contact}>{CONTACTS.phone}</span>
          <span className={s.contact}>{CONTACTS.linkedin}</span>
          <span className={s.contact}>{CONTACTS.github}</span>
        </div>
      </div>
    </section>
  );
};
