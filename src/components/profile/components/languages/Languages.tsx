import { FC, useMemo } from 'react';

import { LANGUAGES } from '@/constants';
import { useTranslation } from '@/hooks';

import { Section, SectionItem } from '../../components';

import './s.module.styl';

export const Languages: FC = () => {
  const { t, i18n } = useTranslation();

  const items = useMemo(() => {
    return LANGUAGES.map((lang) => ({
      title: t(lang.nameKey),
      company: t(lang.levelKey),
      location: lang.levelCode,
    }));
  }, [i18n.language]);

  return (
    <Section title={t('profile.languages')} dark>
      {items.map((it) => (
        <SectionItem key={`${it.title}-${it.location}`} {...it} small />
      ))}
    </Section>
  );
};
