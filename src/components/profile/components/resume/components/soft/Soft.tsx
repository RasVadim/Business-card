import { FC, useMemo } from 'react';

import { SOFT_SKILLS } from '@/constants';
import { useTranslation } from '@/hooks';
import { Tag } from '@/ui-kit';

import { Section } from '../../..';

import s from './s.module.styl';

export const Soft: FC = () => {
  const { t, i18n } = useTranslation();

  const items = useMemo(() => SOFT_SKILLS.map((s) => t(s.nameKey)), [i18n.language]);

  return (
    <Section title={t('profile.soft')} dark>
      <div className={s.list}>
        {items.map((label) => (
          <Tag key={label}>{label}</Tag>
        ))}
      </div>
    </Section>
  );
};
