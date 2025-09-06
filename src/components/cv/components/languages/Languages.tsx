import { FC } from 'react';

import { LANGUAGES } from '@/constants';
import { useTranslation } from '@/hooks';

import { Section } from '../../components';

import s from './s.module.styl';

export const Languages: FC = () => {
  const { t } = useTranslation();

  return (
    <Section title={t('layout.languages')} dark>
      <div className={s.languagesList}>
        {LANGUAGES.map((language) => (
          <div key={language.id} className={s.languageItem}>
            <div className={s.languageRow}>
              <div className={s.languageName}>{t(language.nameKey)}</div>
              <div className={s.languageCode}>{language.levelCode}</div>
            </div>
            <div className={s.languageLevel}>{t(language.levelKey)}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};
