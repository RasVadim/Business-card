import { FC } from 'react';

import { Profile } from '@/components';

import s from './s.module.styl';

const SettingsContent: FC = () => {
  return (
    <div className={s.content}>
      <Profile />
    </div>
  );
};

export default SettingsContent;
