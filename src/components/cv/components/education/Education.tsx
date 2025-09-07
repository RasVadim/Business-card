import { FC } from 'react';

import { CV_ICON_COLOR } from '@/constants';
import { EDUCATION } from '@/constants/profile';
import { useTranslation } from '@/hooks';
import { EducationIcon } from '@/icons';

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
    <Section title={t('layout.education')} icon={<EducationIcon isActive color1={CV_ICON_COLOR} />}>
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
