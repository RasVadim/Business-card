import { FC, useMemo } from 'react';

import { EDUCATION } from '@/constants';
import { useTranslation } from '@/hooks';
import { EducationIcon } from '@/icons';
import { formatMonthYear } from '@/utils';

import { Section, SectionItem } from '../../..';

export const Education: FC = () => {
  const { t, i18n } = useTranslation();

  const item = useMemo(() => {
    return {
      title: t(EDUCATION.degreeKey),
      company: t(EDUCATION.universityKey),
      period: `${formatMonthYear(EDUCATION.startDate)} - ${formatMonthYear(EDUCATION.endDate)}`,
      location: t(EDUCATION.locationKey),
      description: t(EDUCATION.thesisKey),
    };
  }, [i18n.language]);

  return (
    <Section title={t('profile.education')} icon={<EducationIcon />}>
      <SectionItem key={`${item.company}-${item.period}`} {...item} />
    </Section>
  );
};
