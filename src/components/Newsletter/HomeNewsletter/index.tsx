import React from 'react';
import _ from 'lodash';
import styles from './HomeNewsletter.module.scss';
import Newsletter from '../';
import { useTranslations } from '../../../hooks/useTranslations';

const HomeNewsletter = () => {
    const { t, translate } = useTranslations();
    return (
        <div className={styles.newsletterHome}>
            <div className={styles.data}>
                <h2 className={styles.title}>{translate({ value: t.HOME.NEWSLETTER.TITLE, tagName: 'strong' })}</h2>
                <p className={styles.text}>{t.HOME.NEWSLETTER.DESCRIPTION}</p>
                <Newsletter />
            </div>
        </div>
    );
}

export default HomeNewsletter;
