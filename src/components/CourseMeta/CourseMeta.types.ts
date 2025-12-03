import { ReactNode } from 'react';

export interface CourseMetaProps {
  value: string;
  valueBelow?: string | ReactNode;
  label: string;
  icon: ReactNode;
}
