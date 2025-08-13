import { useLanguage } from '@/store/atoms';
import { ELanguage } from '@/types';
import { Button } from '@/ui-kit';

import s from './s.module.styl';

export const LanguageSwitcher = () => {
  const [lang, setLang] = useLanguage();

  const label = lang === ELanguage.EN ? 'EN' : 'RU';

  return (
    <div className={s.wrapper}>
      <Button
        onClick={() => setLang(lang === ELanguage.EN ? ELanguage.RU : ELanguage.EN)}
        label={label}
        size="small"
        circle
        empty
      />
    </div>
  );
};
