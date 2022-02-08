import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonProps, ButtonType } from './Button.types';
import styles from './Button.module.scss';
import arrow from '../../public/icons/arrow.svg';
import arrowWhite from '../../public/icons/arrow-white.svg';
import cx from 'classnames';

const L: FC<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps> = memo(({ pattern, href, label = '', className, children, ...rest }) => {
  const linkContent = (
    <a {...rest} className={cx(styles.button, styles[pattern], className)}>
      {label}
      {(pattern === ButtonType.CLEAN || pattern === ButtonType.SECONDARY) && (
        <div className={styles.arrow}>
          <Image src={arrow || '/icons/arrow.svg'} width={49} height={6} alt=""/>
        </div>
      )}
      {(pattern === ButtonType.PRIMARY || pattern === ButtonType.WHITE) && (
        <div className={styles.arrow}>
          <Image src={arrowWhite || '/icons/arrow-white.svg'} width={38} height={6} alt=""/>
        </div>
      )}
    </a>
  )
  
  return href ? (
    <Link href={href}>
      {linkContent}
    </Link>) : <>{linkContent}</>
});

const B: FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = memo(({ pattern, label = '', action, ...rest}) => {
  return (
      <button className={cx(styles.button, styles[pattern])} onClick={action} {...rest}>
        {label}
        {pattern === ButtonType.CLEAN && (
          <div className={styles.arrow}>
            <Image src={arrow || '/icons/arrow.svg'} width={49} height={6} alt=""/>
          </div>
        )}
        {pattern === ButtonType.SECONDARY && (
          <div className={styles.arrow}>
            <Image src={arrow || '/icons/arrow.svg'} width={49} height={6} alt=""/>
          </div>
        )}
        {pattern === ButtonType.PRIMARY && (
          <div className={styles.arrow}>
            <Image src={arrowWhite || '/icons/arrow-white.svg'} width={38} height={6} alt=""/>
          </div>
        )}
      </button>
  )
});

L.displayName = 'L';
B.displayName = 'B';

const buttons = { L, B };

export default buttons;
