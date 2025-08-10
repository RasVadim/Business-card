import { FC, useState } from 'react';

import { Button } from '@/ui-kit';

import s from './s.module.styl';

const modes = ['A1', 'B2', 'C3'];

export const LifeActions: FC = () => {
  const [currentMode, setMode] = useState<string>('');

  return (
    <div className={s.container}>
      {modes.map((mode) => (
        <Button
          key={mode}
          onClick={() => setMode(mode)}
          icon="test"
          active={currentMode === mode}
          gost={currentMode !== mode}
          size="small"
          onlyIcon
        />
      ))}
    </div>
  );
};
