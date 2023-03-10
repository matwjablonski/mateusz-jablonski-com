import { useTranslations } from '../../hooks/useTranslations';
import styles from './Motivator.module.scss';

const Motivator = () => {
    const { translate, t } = useTranslations();

    return (
        <hgroup className={styles.motivator}>
            <h2>{translate({
                value: t.ABOUT.MOTIVATOR.TITLE,
                tagName: 'strong',
            })}</h2>
            <p>{t.ABOUT.MOTIVATOR.MESSAGE}</p>
        </hgroup>
    );
}

export default Motivator;
