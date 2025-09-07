import { FC } from 'react';

import { useCVScale } from '@/hooks';

import { HeaderCard, MainGrid } from './components';

import s from './s.module.styl';

export const CV: FC = () => {
  const scale = useCVScale();

  return (
    <div
      className={s.wrapper}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: scale < 1 ? '880px' : '100%',
        height: scale < 1 ? `${1200 * scale}px` : 'auto',
      }}
    >
      <div className={s.cvTable}>
        <div id="cv-content" className={s.cvList}>
          <HeaderCard />
          <MainGrid />
        </div>
      </div>
    </div>
  );
};
