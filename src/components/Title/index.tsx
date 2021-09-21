import React, { FunctionComponent } from 'react';
import styles from './Title.module.scss'
import { TitleProps } from './Title.types';

const PageTitle: FunctionComponent<TitleProps> = ({classes, children}) => (
  <div className={styles.wrapper}>
    <h2 className={classes}>{children}</h2>
  </div>
)

export default PageTitle
