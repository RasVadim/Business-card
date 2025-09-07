import { FC } from 'react';

import { CV_ICON_COLOR, LANGUAGES } from '@/constants';
import { useTranslation } from '@/hooks';
import { LanguagesIcon } from '@/icons';

import { Section } from '../../components';

import s from './s.module.styl';

export const Languages: FC = () => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('layout.languages')}
      dark
      icon={<LanguagesIcon isActive color1={CV_ICON_COLOR} />}
    >
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
