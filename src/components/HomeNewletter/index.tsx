import React from 'react';
import styles from './HomeNewsletter.module.scss';

const HomeNewsletter = () => {
    return (
        <div className={styles.newsletterHome}>
            <div className={styles.data}>
                <h2 className={styles.title}>Dołącz do newslettera i bądź na bieżąco <strong>za darmo!</strong></h2>
                <p className={styles.text}>Dołącz bezpłatnie do mojego newslettera. Będziesz otrzymywać informacje o nowych artykułach, ciekawostki ze świata programowania i dużo praktycznych porad na temat własnego rozwoju.</p>
            </div>
        </div>
    )
}

export default HomeNewsletter;
