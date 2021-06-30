import React from 'react';
import styles from './ExternalLink.module.scss';

export const ExternalLink = ({ href, children }) => (
  <div className={styles.wrapper}>
    <a className={styles.externalLink} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </div>
);

export default ExternalLink
