import { ReactElement } from 'react';

import { LINK_BEGINNING, WATSAPP_PREFIX } from '@/constants';
import { CONTACTS } from '@/constants/profile';
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, WhatsappIcon } from '@/icons';
import { EThemeMode } from '@/types';

type TContact = {
  icon: ReactElement;
  href: string;
  tooltip: string;
  label: string;
};

export const getContactsData = (theme: EThemeMode) => {
  const oppositeColor = theme === EThemeMode.DARK ? '#FFFFFF' : '#000000';

  const contacts: TContact[] = [
    {
      icon: <LinkedinIcon />,
      href: LINK_BEGINNING + CONTACTS.linkedin,
      tooltip: CONTACTS.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: <GithubIcon color={oppositeColor} />,
      href: LINK_BEGINNING + CONTACTS.github,
      tooltip: CONTACTS.github,
      label: 'GitHub',
    },
    {
      icon: <TelegramIcon />,
      href: LINK_BEGINNING + CONTACTS.telegram,
      tooltip: CONTACTS.telegram,
      label: 'Telegram',
    },
    {
      icon: <WhatsappIcon />,
      href: LINK_BEGINNING + WATSAPP_PREFIX + CONTACTS.whatsapp.replace(/\D/g, ''),
      tooltip: CONTACTS.whatsapp,
      label: 'WhatsApp',
    },
    {
      icon: <MailIcon color={oppositeColor} />,
      href: `mailto:${CONTACTS.mail}`,
      tooltip: CONTACTS.mail,
      label: 'Email',
    },
  ];

  return contacts;
};
