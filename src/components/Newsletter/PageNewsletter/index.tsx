import React from 'react';
import _ from 'lodash';
import styles from './PageNewsletter.module.scss';
import Newsletter from '../';

const PageNewsletter = () => (
    <div className={styles.newsletterHome}>
        <div className={styles.data}>
            <h2 className={styles.title}>Zapisz się do newslettera</h2>
            <p className={styles.text}>Bądź na bieżąco z nowymi materiałami, ćwiczeniami i ciekawostkami ze świata IT. Dołącz do mnie.</p>
            <Newsletter cssFormClass={styles.smallForm} />
        </div>
    </div>
);

export default PageNewsletter;
