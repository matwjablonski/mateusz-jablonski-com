export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
  CLEAN = 'clean',
  WHITE = 'white',
}

export interface ButtonProps {
  pattern: ButtonType;
  href?: string;
  label?: string;
  action?: () => void;
}

export interface LinkProps extends ButtonProps {
  passHref?: boolean;
  isExternal?: boolean;
}
