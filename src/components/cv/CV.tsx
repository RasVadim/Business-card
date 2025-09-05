import { FC } from 'react';

import { ExportButton, HeaderCard, MainGrid } from './components';

import s from './s.module.styl';

export const CV: FC = () => {
  return (
    <div className={s.wrapper}>
      <ExportButton targetElementId="cv-content" filename="Vadim_Rasstrigin_CV.pdf" />
      <div className={s.cvTable}>
        <div id="cv-content" className={s.cvList}>
          <HeaderCard />
          <MainGrid />
        </div>
      </div>
    </div>
  );
};
