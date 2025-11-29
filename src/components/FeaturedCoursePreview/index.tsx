import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedCoursePreview.module.scss';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import placeholder from '../../public/placeholder.png';
import { useTranslations } from '../../hooks/useTranslations';
import { DaysBadge, LevelBadge, WorkshopWrapper } from './ui';

type FeaturedCoursePreviewProps = {
    title: string;
    slug: string;
    description: string;
    days?: number;
    level?: string;
}

const FeaturedCoursePreview = ({ title, slug, description, days, level }: FeaturedCoursePreviewProps) => {
    const { t } = useTranslations();

    return <WorkshopWrapper>
        <div className={styles.imageBox}>
            <Image
                src={placeholder}
                width={544}
                height={256}
                className={styles.image}
                alt={title}
            />
            {days && <DaysBadge days={days} />}
            {level && <LevelBadge level={level.toUpperCase()} />}
        </div>
        <Link href={`workshops/${slug}`} title={title}>
            <h3 className={styles.title}>{title}</h3>
        </Link>
        <p className={styles.text}>{description}</p>
        <Button.L href={`workshops/${slug}`} label={t.WORKSHOPS.ACTIONS.TAKE_PART} pattern={ButtonType.PRIMARY} />
    </WorkshopWrapper>
}

export default FeaturedCoursePreview;
