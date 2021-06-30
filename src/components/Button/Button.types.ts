import { AnchorHTMLAttributes } from 'react';

export enum ButtonType {
  PRIMARY = 'primary',
  CLEAN = 'clean',
}

export interface ButtonProps {
  type: ButtonType;
  href: string;
  label: string;
}
