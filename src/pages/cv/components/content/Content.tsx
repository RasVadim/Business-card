import { FC } from 'react';

import { CV } from '@/components';

import s from './s.module.styl';

const CVContent: FC = () => {
  return (
    <div className={s.content}>
      <CV />
    </div>
  );
};

export default CVContent;
