import cx from 'classnames';
import styles from './WhatCanITeachYou.module.scss';
import { useTranslations } from '../../hooks/useTranslations';

const WhatCanITeachYou = () => {
    const { t, translate } = useTranslations();

    return (
        <section className={styles.whatCanITeachYou}>
            <h2 className={styles.title}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TITLE}</h2>
            <h3 className={styles.subtitle}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.I_TEACH_ADULTS_KIDS_SUBTITLE}</h3>
            <p className={styles.text}>{translate({
                value: t.ABOUT.WHAT_CAN_I_TEACH_YOU.I_TEACH_ADULTS_KIDS_TEXT,
                tagName: 'strong',
            })}</p>
            <h4 className={styles.listTitle}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TOPICS_SUBTITLE}</h4>
            <ul className={styles.list}>
                <li className={styles.listItem}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TOPICS[0]}</li>
                <li className={styles.listItem}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TOPICS[1]}</li>
                <li className={styles.listItem}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TOPICS[2]}</li>
                <li className={styles.listItem}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TOPICS[3]}</li>
                <li className={styles.listItem}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TOPICS[4]}</li>
            </ul>
            <p className={styles.text}>{translate({
                value: t.ABOUT.WHAT_CAN_I_TEACH_YOU.WORK_WITH_KIDS_TEXT,
                tagName: 'strong',
            })}</p>
            <p className={cx(styles.text, styles.isLast)}>{t.ABOUT.WHAT_CAN_I_TEACH_YOU.TRAININGS_TEXT}</p>
        </section>
    );
}

export default WhatCanITeachYou;
