import React, { AnchorHTMLAttributes, FunctionComponent, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonProps, ButtonType } from './Button.types';
import styles from './Button.module.scss';
import arrow from '../../public/icons/arrow.svg'
import cx from 'classnames';

const Button: FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps> = memo(({ type, href, label = '', ...rest}) => {
  return (
    <Link href={href}>
      <a {...rest} className={cx(styles.button, styles[type])}>
        {label}
        {type === ButtonType.CLEAN && (
          <div className={styles.arrow}>
            <Image src={arrow || '/icons/arrow.svg'} width={49} height={6}/>
          </div>
        )}
      </a>
    </Link>
  )
})

export default Button;
