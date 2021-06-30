import React, { FunctionComponent } from 'react';
import styles from './Grid.module.scss';

const Grid: FunctionComponent = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Grid
