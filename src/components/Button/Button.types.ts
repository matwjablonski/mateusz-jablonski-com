export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  LIGTHENED = 'lightened',
  RED = 'red',
  CLEAN = 'clean',
  WHITE = 'white',
  BACK = 'back',
}

export interface ButtonProps {
  pattern: ButtonType;
  href?: string;
  label?: string;
  action?: () => void;
  hideArrow?: boolean;
}

export interface LinkProps extends ButtonProps {
  passHref?: boolean;
  isExternal?: boolean;
}
