import { FC, ReactNode, useState } from 'react';

import cn from 'classnames';

import { TOOLTIP_DELAY } from '@/constants';
import { TPosition } from '@/types';

import s from './s.module.styl';

type TProps = {
  header?: ReactNode;
  content: ReactNode;
  children: ReactNode;
  position?: TPosition;
  delay?: number;
  arrow?: boolean;
  maxWidth?: number;
};

export const Tooltip: FC<TProps> = ({
  header,
  content,
  children,
  position = 'top',
  delay = TOOLTIP_DELAY.normal,
  arrow = false,
  maxWidth,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  return (
    <div className={s.wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isVisible && (
        <div
          className={cn(s.tooltip, s[position], s.visible, { [s.arrow]: arrow })}
          style={{ maxWidth }}
        >
          {header && <div className={s.header}>{header}</div>}
          <div className={s.content}>{content}</div>
        </div>
      )}
    </div>
  );
};
