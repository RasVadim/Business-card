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
  const { exportToPDF, isExporting } = useExportPDF();

  const handleExport = () => {
    exportToPDF(targetElementId, filename);
  };

  return (
    <div className={s.container}>
      <Button
        className={s.exportButton}
        onClick={handleExport}
        label={t('layout.save')}
        size={isMedium ? 'medium' : 'large'}
        icon={isExporting ? <div className={s.loadingSpinner} /> : <SaveIcon />}
        gradient
        empty
        onlyIcon={isMedium}
        disabled={isExporting}
      />
    </div>
  );
};
