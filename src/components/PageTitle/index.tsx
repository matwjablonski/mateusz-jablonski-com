import { FC } from 'react';
import Title from '../Title';
import { PageTitleProps } from './PageTitle.types';
import styles from './PageTitle.module.scss';

const PageTitle: FC<PageTitleProps> = ({ title, description }) => {
    return (
        <div className={styles.pageTitle}>
            <Title>{title}</Title>
            <p className={styles.p}>{description}</p>
        </div>
    )
}

export default PageTitle;
