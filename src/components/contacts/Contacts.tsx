import { FC, useMemo } from 'react';

import { useThemeMode } from '@/store/atoms';
import { TPosition } from '@/types';
import { Button, Tooltip } from '@/ui-kit';

import { getContactsData } from './utils';

import s from './s.module.styl';

type PropsType = {
  tooltipPosition?: TPosition;
};

export const Contacts: FC<PropsType> = ({ tooltipPosition = 'top' }) => {
  const [theme] = useThemeMode();

  const contacts = useMemo(() => getContactsData(theme), [theme]);

  const handleContactClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={s.contacts}>
      {contacts.map((contact) => {
        return (
          <Tooltip
            key={contact.label}
            content={<div className={s.tooltip}>{contact.tooltip}</div>}
            position={tooltipPosition}
            delay={300}
          >
            <Button
              onClick={() => handleContactClick(contact.href)}
              icon={contact.icon}
              gost
              size="large"
              onlyIcon
              className={s.contactButton}
            ></Button>
          </Tooltip>
        );
      })}
    </div>
  );
};
