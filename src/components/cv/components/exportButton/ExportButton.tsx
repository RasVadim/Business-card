import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { useDevice, useExportPDF } from '@/hooks';
import { SaveIcon } from '@/icons';
import { Button } from '@/ui-kit';

import s from './s.module.styl';

interface ExportButtonProps {
  targetElementId: string;
  filename?: string;
}

export const ExportButton: FC<ExportButtonProps> = ({ targetElementId, filename = 'CV.pdf' }) => {
  const { t } = useTranslation();

  const { isMedium } = useDevice();
  const { exportToPDF } = useExportPDF();

  const handleExport = () => {
    exportToPDF(targetElementId, filename);
  };

  const label = t('layout.save');

  return (
    <div className={s.container}>
      <Button
        className={s.exportButton}
        onClick={handleExport}
        label={label}
        size={isMedium ? 'medium' : 'large'}
        icon={<SaveIcon />}
        gradient
        empty
        onlyIcon={isMedium}
      />
    </div>
  );
};
