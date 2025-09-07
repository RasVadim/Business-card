import { FC } from 'react';

import { HeaderCard, MainGrid } from './components';

import s from './s.module.styl';

export const CV: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.cvTable}>
        <div id="cv-content" className={s.cvList}>
          <HeaderCard />
          <MainGrid />
        </div>
      </div>
    </div>
  );
};
