import cx from 'classnames';
import styles from './WhatCanITeachYou.module.scss';

const WhatCanITeachYou = () => {
    return (
        <section className={styles.whatCanITeachYou}>
            <h2 className={styles.title}>Czego mogę Cię nauczyć?</h2>
            <h3 className={styles.subtitle}>Uczę programować dzieci i dorosłych</h3>
            <p className={styles.text}>Nauczanie programowania dla osób dorosłych odbywa się za pośrednictwem szkół programowania, takich jak Kodilla (<a href="https://kodilla.com/pl/mentorzy" target="_blank" rel="noreferrer noopener nofollow">tutaj mnie znajdziesz</a>) lub prywatnie w formie <strong>mentoringu lub szkoleń i warsztatów</strong> (dla Sages i StacjiIT). Mentoring to specyficzna forma współpracy, która wymaga od każdej ze stron pełnego zaanganżowania.</p>
            <h4 className={styles.listTitle}>Na zajęciach ze mną poruszysz tematy związane z:</h4>
            <ul className={styles.list}>
                <li className={styles.listItem}>szeroko pojętym programowaniem</li>
                <li className={styles.listItem}>dobrymi praktykami i jakością</li>
                <li className={styles.listItem}>testowaniem</li>
                <li className={styles.listItem}>technologiami frontendowymi</li>
                <li className={styles.listItem}>narzędziami i warsztatem programisty</li>
            </ul>
            <p className={styles.text}>Praca z dziećmi opiera się przede wszystkim na pokazaniu <strong>nowego sposobu uczenia się</strong>, poznawaniu technologii, wskazywaniu możliwości i niebezpieczeństw, które związane są z branżą IT. Na zajęciach z programowania dzieci tworzą samodzielnie proste programy z wykorzystaniem najpopularniejszych języków programowania. <strong>Najmłodsze dzieci, z którymi pracuję mają 11 lat.</strong> Zajęcia odbywają się w małych maksymalnie 4 osobowych grupach lub indywidualnie.</p>
            <p className={cx(styles.text, styles.isLast)}>Na szkoleniach i warsztatach ze mną możesz liczyć na dużo uśmiechu, zrozumienie, rzetelną wiedzę, ciekawe materiały dodatkowe i angażujące zadania.</p>
        </section>
    );
}

export default WhatCanITeachYou;
