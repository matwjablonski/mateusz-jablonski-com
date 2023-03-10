import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonProps, ButtonType, LinkProps } from './Button.types';
import styles from './Button.module.scss';
import arrow from '../../public/icons/arrow.svg';
import arrowWhite from '../../public/icons/arrow-white.svg';
import backIcon from '../../public/icons/back.svg';
import cx from 'classnames';

const L: FC<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps> = memo(({ pattern, href, label = '', className, children, passHref, isExternal, ...rest }) => {
  const linkContent = <>
    {pattern === ButtonType.BACK && (
      <div className={styles.arrowBack}>
        <Image src={backIcon || '/icons/back.svg'} width={24} height={24} alt=""/>
      </div>
    )}
    {label}
    {(pattern === ButtonType.CLEAN || pattern === ButtonType.SECONDARY) && (
      <div className={styles.arrow}>
        <Image src={arrow || '/icons/arrow.svg'} width={49} height={6} alt=""/>
      </div>
    )}
    {(pattern === ButtonType.PRIMARY || pattern === ButtonType.WHITE || pattern === ButtonType.LIGTHENED) && (
      <div className={styles.arrow}>
        <Image src={arrowWhite || '/icons/arrow-white.svg'} width={38} height={6} alt=""/>
      </div>
    )}
  </>;
  
  const createAnchorContent = (href?: string, target?: string) => (
    <a {...rest} className={cx(styles.button, styles[pattern], className)} href={href} target={target} rel="noopener noreferrer">
      {linkContent}
    </a>
  )

  if (isExternal) {
    return <>
      {createAnchorContent(href, '_blank')}
    </>
  }
  
  return href ? (
    <Link href={href} passHref={passHref} {...rest} className={cx(styles.button, styles[pattern], className)}>
      {linkContent}
    </Link>) : <>{createAnchorContent()}</>
});

const B: FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = memo(({ pattern, label = '', action, className, ...rest}) => {
  return (
      <button className={cx(styles.button, styles[pattern], className)} onClick={action} {...rest}>
        {pattern === ButtonType.BACK && (
          <div className={styles.arrowBack}>
            <Image src={backIcon || '/icons/back.svg'} width={24} height={24} alt=""/>
          </div>
        )}
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
        {(pattern === ButtonType.PRIMARY || pattern === ButtonType.LIGTHENED) && (
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
