import React, { FunctionComponent, useMemo } from 'react';
import Image from 'next/image';
import { CourseParticipantsCounterProps } from './CourseParticipantsCounter.types';
import armchair from '../../public/icons/armchair.svg';
import styles from './CourseParticipantsCounter.module.scss';

const CourseParticipantsCounter: FunctionComponent<CourseParticipantsCounterProps> = ({ title, participants, maxParticipants }) => {
    const leftPlaces = useMemo(() => maxParticipants - participants, [maxParticipants, participants]);

    const spendTimeInPercentage = useMemo(() => `${Math.floor(participants / maxParticipants * 100)}%`, [maxParticipants, participants]);
    
    return (
        <div className={styles.counter}>
            <div className={styles.content}>
                <div>
                    <h3 className={styles.subtitle}>Pozostało miejsc</h3>
                    <h2 className={styles.title}>{leftPlaces}</h2>
                </div>
                <div className={styles.calendarIcon}>
                    <Image src={armchair || `/icons/armchair.svg`} alt="" height={32} width={32} />
                </div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressBarFill} style={{ width: spendTimeInPercentage}}/>
            </div>
        </div>
    )
}

export default CourseParticipantsCounter;
