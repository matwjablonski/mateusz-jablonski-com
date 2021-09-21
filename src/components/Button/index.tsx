import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FunctionComponent, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonProps, ButtonType } from './Button.types';
import styles from './Button.module.scss';
import arrow from '../../public/icons/arrow.svg';
import arrowWhite from '../../public/icons/arrow-white.svg';
import cx from 'classnames';

const L: FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps> = memo(({ pattern, href, label = '', children, ...rest}) => {
  return (
    <Link href={href}>
      <a {...rest} className={cx(styles.button, styles[pattern])}>
        {label}
        {pattern === ButtonType.CLEAN && (
          <div className={styles.arrow}>
            <Image src={arrow || '/icons/arrow.svg'} width={49} height={6}/>
          </div>
        )}
      </a>
    </Link>
  )
});

const B: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = memo(({ pattern, label = '', ...rest}) => {
  return (
      <button className={cx(styles.button, styles[pattern])} {...rest}>
        {label}
        {pattern === ButtonType.CLEAN && (
          <div className={styles.arrow}>
            <Image src={arrow || '/icons/arrow.svg'} width={49} height={6}/>
          </div>
        )}
        {pattern === ButtonType.PRIMARY && (
          <div className={styles.arrow}>
            <Image src={arrowWhite || '/icons/arrow-white.svg'} width={38} height={6}/>
          </div>
        )}
      </button>
  )
});

export default { L, B };
