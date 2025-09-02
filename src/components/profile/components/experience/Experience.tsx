import { FC } from 'react';

import { Education, Languages, Soft, Technical, WorkExperience } from './components';

import s from './s.module.styl';

export const Experience: FC = () => {
  // Static placeholder content that mirrors the PDF layout structure
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <WorkExperience />
        <Education />
      </div>
      <div className={s.right}>
        <Technical />
        <Soft />
        <Languages />
      </div>
    </div>
  );
};
