import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import styles from './Counter.module.scss';
import { CounterProps } from './Counter.types';
import calendar from '../../public/icons/calendar.svg';
import { useTranslations } from '../../hooks/useTranslations';

const Counter: FunctionComponent<CounterProps> = ({ days, nextItemName }) => {
    const { t } = useTranslations();

    const prepareDaysLabel = () => {
        if (days === null) {
            return 'nie wiem';
        }
        if (days === 1) {
            return 'jutro';
        }
        return `${days} dni`
    }

    return (
        <div className={styles.counter}>
            <div className={styles.counterText}>
                <span className={styles.nextTitle}>{t.COMMON.NEXT} {nextItemName}</span>
                <span className={styles.remainingDays}>{prepareDaysLabel()}</span>
            </div>
            <div className={styles.icon}>
                <Image src={calendar || `/icons/calendar.svg`} width={24} height={24} alt=""/>
            </div>
        </div>
    )
}

export default Counter;
