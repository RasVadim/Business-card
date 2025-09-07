import { FC } from 'react';

import { CV_ICON_COLOR } from '@/constants';
import { COMPANIES } from '@/constants/companies';
import { useTranslation } from '@/hooks';
import { WorkExperienceIcon } from '@/icons';

import { ExpierienceItem } from '../expierienceItem/ExpierienceItem';
import { Section } from '../section/Section';

export const WorkExperience: FC = () => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('layout.workExperience')}
      hight="780px"
      icon={<WorkExperienceIcon isActive color1={CV_ICON_COLOR} />}
    >
      {Object.values(COMPANIES).map((company, index) => (
        <ExpierienceItem key={`${company.name}-${index}`} company={company} />
      ))}
    </Section>
  );
};
