import { FC } from 'react';
import cx from 'classnames';
import Title from '../Title';
import { PageTitleProps } from './PageTitle.types';
import styles from './PageTitle.module.scss';

const PageTitle: FC<PageTitleProps> = ({ title, description, center, dark }) => {
    return (
        <div className={cx(styles.pageTitle, center && styles.center)}>
            <Title dark={dark}>{title}</Title>
            <p className={styles.p}>{description}</p>
        </div>
    )
}

export default PageTitle;
