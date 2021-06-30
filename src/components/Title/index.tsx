import React from 'react';
import styles from './Title.module.scss'

const PageTitle = ({classes, children}) => (
  <div className={styles.wrapper}>
    <h2 className={classes}>{children}</h2>
  </div>
)

export default PageTitle
