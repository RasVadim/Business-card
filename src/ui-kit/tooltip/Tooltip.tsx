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
  fillSpaace?: boolean;
};

export const Tooltip: FC<TProps> = ({
  header,
  content,
  children,
  position = 'top',
  delay = TOOLTIP_DELAY.normal,
  arrow = false,
  maxWidth,
  fillSpaace = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  const handleMouseEnter = () => {
    setShouldShow(true);
    // Use CSS transition delay instead of setTimeout
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  const handleMouseLeave = () => {
    setShouldShow(false);
    setIsVisible(false);
  };

  return (
    <div
      className={cn(s.wrapper, { [s.fillSpaace]: fillSpaace })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className={cn(s.tooltip, s[position], {
          [s.visible]: isVisible,
          [s.arrow]: arrow,
        })}
        style={{
          maxWidth,
          transitionDelay: shouldShow ? `${delay}ms` : '0ms',
          transitionDuration: '200ms',
          transitionProperty: 'opacity, transform',
        }}
      >
        {header && <div className={s.header}>{header}</div>}
        <div className={s.content}>{content}</div>
      </div>
    </div>
  );
};
