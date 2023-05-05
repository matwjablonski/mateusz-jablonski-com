import { FC, PropsWithChildren } from 'react';
import styles from './SectionPodcast.module.scss';

const SectionPodcast: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <section className={styles.SectionPodcast}>
      {children}
    </section>
  )
}

export default SectionPodcast;
