import { FC, useMemo } from 'react';

import { COMPANIES } from '@/constants';
import { useTranslation } from '@/hooks';
import { WorkExperienceIcon } from '@/icons';
import { formatMonthYear } from '@/utils';

import { Section, SectionItem } from '../../..';

export const WorkExperience: FC = () => {
  const { t, i18n } = useTranslation();

  const items = useMemo(() => {
    const latestCompany = Object.values(COMPANIES).reduce((latest, current) =>
      new Date(current.startDate) > new Date(latest.startDate) ? current : latest,
    );

    return Object.values(COMPANIES).map((company) => {
      const isPresent = !company.endDate && latestCompany.name === company.name;
      const end = isPresent ? 'Present' : company.endDate ? formatMonthYear(company.endDate) : '';

      return {
        title: company.position,
        company: company.name,
        period: end ? `${formatMonthYear(company.startDate)} - ${end}` : formatMonthYear(company.startDate),
        location: company.countries?.join(', '),
        description: t(company.descriptionKey),
        projects: company.projects,
        image: company.image,
        colorLess: company.isPM,
      };
    });
  }, [t, i18n.language]);

  return (
    <Section title={t('layout.workExperience')} icon={<WorkExperienceIcon />}>
      {items.map((it) => (
        <SectionItem key={`${it.company}-${it.period}`} {...it} />
      ))}
    </Section>
  );
};
