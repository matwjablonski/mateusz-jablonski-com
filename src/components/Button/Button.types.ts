import { AnchorHTMLAttributes } from 'react';

export enum ButtonType {
  PRIMARY = 'primary',
  CLEAN = 'clean',
}

export interface ButtonProps {
  pattern: ButtonType;
  href?: string;
  label: string;
}
