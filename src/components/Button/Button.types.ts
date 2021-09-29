import { AnchorHTMLAttributes } from 'react';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  CLEAN = 'clean',
}

export interface ButtonProps {
  pattern: ButtonType;
  href?: string;
  label: string;
  action?: () => void;
}
