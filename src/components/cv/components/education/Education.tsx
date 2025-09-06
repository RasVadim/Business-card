import { FC } from 'react';

import { EDUCATION } from '@/constants/profile';
import { useTranslation } from '@/hooks';

import { Section } from '../section/Section';
import { SectionItem } from '../sectionItem/SectionItem';

export const Education: FC = () => {
  const { t } = useTranslation();

  const dates = `${new Date(EDUCATION.startDate).toLocaleDateString('en-US', {
    month: '2-digit',
    year: 'numeric',
  })} - ${new Date(EDUCATION.endDate).toLocaleDateString('en-US', {
    month: '2-digit',
    year: 'numeric',
  })}`;

  return (
    <Section title={t('layout.education')}>
      <SectionItem
        title={t(EDUCATION.degreeKey)}
        subtitle={t(EDUCATION.universityKey)}
        dates={dates}
        location={t(EDUCATION.locationKey)}
        description={t(EDUCATION.thesisKey)}
      />
    </Section>
  );
};
