import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './Title.module.scss'
import { TitleProps } from './Title.types';

const Title: FunctionComponent<TitleProps> = ({classes, children, capitalize}) => (
  <div className={styles.wrapper}>
    <h2 className={cx(classes, capitalize && styles.capitalize)}>{children}</h2>
  </div>
)

export default Title
