import { FC, useEffect, useState } from 'react';

import { TOOLTIP_DELAY } from '@/constants';
import { useScrollTo, useTranslation } from '@/hooks';
import { ESection } from '@/types';
import { Button, TIconName, Tooltip } from '@/ui-kit';

import s from './s.module.styl';

const AUTO_SCROLL_SECTION_OFFSET = 80;
const DETECTION_SECTION_OFFSET = 500;

type PropsType = {
  isMobile?: boolean;
};

export const ProfileNavigation: FC<PropsType> = ({ isMobile = false }) => {
  const { t } = useTranslation();

  const [currentSection, setCurrentSection] = useState<string>('');
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  const { scrollTo } = useScrollTo();

  // Track scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll) {
        return;
      }

      const sections = Object.values(ESection);
      const scrollPosition = window.scrollY + DETECTION_SECTION_OFFSET; // offset for better detection

      // Find which section is currently visible
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    // Set initial section
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProgrammaticScroll]);

  const handleSectionClick = async (section: ESection) => {
    setIsProgrammaticScroll(true);
    setCurrentSection(section);

    try {
      await scrollTo(section, AUTO_SCROLL_SECTION_OFFSET);
    } finally {
      setIsProgrammaticScroll(false);
    }
  };

  return (
    <div className={s.container}>
      {Object.values(ESection).map((section) => (
        <Tooltip
          content={t(`layout.${section}`)}
          key={section}
          position="bottom-left"
          delay={TOOLTIP_DELAY.slow}
        >
          <Button
            key={section}
            onClick={() => handleSectionClick(section)}
            icon={section as TIconName}
            active={currentSection === section}
            gost={currentSection !== section}
            size={isMobile ? 'medium' : 'small'}
            onlyIcon
          />
        </Tooltip>
      ))}
    </div>
  );
};
