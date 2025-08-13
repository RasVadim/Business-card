import { FC } from 'react';

import { useTranslation } from '@/hooks';

import { Avatar } from '../avatar/Avatar';

import s from './s.module.styl';

export const HeaderCard: FC = () => {
  const { t } = useTranslation();

  const name = t('profile.name');
  const role = t('profile.role');

  return (
    <section className={s.wrapper}>
      <div className={s.center}>
        <Avatar />
        <div className={s.titleBlock}>
          <h1 className={s.name}>{name}</h1>
          <div className={s.role}>{role}</div>
        </div>
      </div>
    </section>
  );
};
