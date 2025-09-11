import { FC, ReactNode } from 'react';

import cn from 'classnames';

import { TProjectView } from '../../Projects';
import { ProjectInfo } from '../projectInfo/ProjectInfo';
import { ProjectVideo } from '../projectVideo/ProjectVideo';

import s from './s.module.styl';

type TProps = {
  project: TProjectView;
  className?: string;
  tooltipMaxWidth?: number;
  tooltipHeader?: ReactNode;
};

export const ProjectCard: FC<TProps> = ({
  project,
  className,
  tooltipMaxWidth = 520,
  tooltipHeader,
}) => {
  return (
    <div className={cn(s.wrapper, className)}>
      <ProjectInfo project={project} />
      <ProjectVideo
        project={project}
        tooltipMaxWidth={tooltipMaxWidth}
        tooltipHeader={tooltipHeader}
      />
    </div>
  );
};
