import React, { FunctionComponent, useMemo } from 'react';
import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import { NextCourseCounterProps } from './NextCourseCounter.types';
import calendar from '../../public/icons/calendar-white.svg';
import styles from './NextCourseCounter.module.scss';

const NextCourseCounter: FunctionComponent<NextCourseCounterProps> = ({ title, startDate, endDate }) => {
    const allDays = useMemo(() => differenceInDays(endDate, startDate), [endDate, startDate]);
    const allDaysLeft = useMemo(() => differenceInDays(endDate, new Date()), [endDate]);

    const spendTimeInPercentage = useMemo(() => `${Math.floor((allDays - allDaysLeft) / allDays * 100)}%`, [allDays, allDaysLeft]);
    
    return (
        <div className={styles.counter}>
            <div className={styles.content}>
                <div>
                    <h3 className={styles.subtitle}>Teraz powstaje</h3>
                    <h2 className={styles.title} title={title}>{title}</h2>
                </div>
                <div className={styles.calendarIcon}>
                    <Image src={calendar || `/icons/calendar-white.svg`} alt="" height={32} width={32} />
                </div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressBarFill} style={{ width: spendTimeInPercentage}}/>
            </div>
        </div>
    )
}

export default NextCourseCounter;