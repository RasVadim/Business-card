import { FC, useMemo } from 'react';

import { COMPANIES, PROJECTS } from '@/constants';
import { useTranslation } from '@/hooks';
import { formatMonthYear } from '@/utils';

import { Section, SectionItem } from '../../components';

export const WorkExperience: FC = () => {
  const { t, i18n } = useTranslation();

  const items = useMemo(() => {
    return COMPANIES.map((company) => {
      const projectList = PROJECTS.filter(
        (p) => p.companyId === Number(company.id?.replace('c', '')),
      );
      const projects = projectList.map((p) => t(p.name));

      return {
        title: company.position,
        company: company.name,
        period: `${formatMonthYear(company.startDate)} - ${formatMonthYear(company.endDate)}`,
        location: company.countries?.join(', '),
        description: t(company.descriptionKey),
        projects,
        image: company.image,
      };
    });
  }, [t, i18n.language]);

  return (
    <Section title={t('profile.workExperience')}>
      {items.map((it) => (
        <SectionItem key={`${it.company}-${it.period}`} {...it} />
      ))}
    </Section>
  );
};
