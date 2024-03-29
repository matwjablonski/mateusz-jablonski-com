import React from 'react';
import _ from 'lodash';
import styles from './HomeNewsletter.module.scss';
import Newsletter from '../';

const HomeNewsletter = () => (
    <div className={styles.newsletterHome}>
        <div className={styles.data}>
            <h2 className={styles.title}>Dołącz do newslettera i bądź na bieżąco <strong>za darmo!</strong></h2>
            <p className={styles.text}>Dołącz bezpłatnie do mojego newslettera. Będziesz otrzymywać informacje o nowych artykułach, ciekawostki ze świata programowania i dużo praktycznych porad na temat własnego rozwoju.</p>
            <Newsletter />
        </div>
    </div>
);

export default HomeNewsletter;
