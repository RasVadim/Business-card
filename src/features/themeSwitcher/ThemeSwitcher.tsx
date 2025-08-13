import { MoonIcon, SunIcon } from '@/icons';
import { useThemeMode } from '@/store/atoms';
import { EThemeMode } from '@/types';
import { Button } from '@/ui-kit';

import s from './s.module.styl';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useThemeMode();

  const icon = theme === EThemeMode.LIGHT ? <SunIcon isActive /> : <MoonIcon isActive />;

  return (
    <div className={s.wrapper}>
      <Button
        onClick={() => setTheme(theme === EThemeMode.LIGHT ? EThemeMode.DARK : EThemeMode.LIGHT)}
        icon={icon}
        onlyIcon
        size="small"
        empty
      />
    </div>
  );
};
