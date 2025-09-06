import { FC, useEffect, useState } from 'react';

import { TOOLTIP_DELAY } from '@/constants';
import { useScrollTo, useTranslation } from '@/hooks';
import { ESection } from '@/types';
import { Button, TIconName, Tooltip } from '@/ui-kit';
import { globalScrollManager, createSectionScrollHandler } from '@/utils';

import s from './s.module.styl';

const AUTO_SCROLL_SECTION_OFFSET = 80;

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
    const scrollHandler = createSectionScrollHandler(setCurrentSection, isProgrammaticScroll);

    // Add scroll listener to global manager
    globalScrollManager.addScrollListener(scrollHandler);

    // Set initial section
    scrollHandler();

    return () => {
      globalScrollManager.removeScrollListener(scrollHandler);
    };
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
      {Object.values(ESection).map((section, index) => (
        <div
          key={section}
          className={s.item}
          style={{ '--delay': `${(index + 1) * 0.06}s` } as React.CSSProperties}
        >
          <Tooltip
            content={t(`layout.${section}`)}
            position="bottom-left"
            delay={TOOLTIP_DELAY.slow}
          >
            <Button
              onClick={() => handleSectionClick(section)}
              icon={section as TIconName}
              active={currentSection === section}
              gost={currentSection !== section}
              size={isMobile ? 'medium' : 'small'}
              onlyIcon
            />
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
