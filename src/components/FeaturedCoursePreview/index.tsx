import React, { FunctionComponent } from 'react';
import { Entry, EntrySkeletonType } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '../../types/common/Course.types';
import styles from './FeaturedCoursePreview.module.scss';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import placeholder from '../../public/placeholder.png';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import { useTranslations } from '../../hooks/useTranslations';

const FeaturedCoursePreview: FunctionComponent<{ course: Course }> = ({ course }) => {
    const { title, slug, description, featuredImage} = course;
    const { t } = useTranslations();

    return <div className={styles.course}>
        <div className={styles.imageBox}>
            <Image
                src={featuredImage ? prepareImageUrl(featuredImage.fields.file.url as string) : placeholder}
                width={544}
                height={256}
                className={styles.image}
                alt={featuredImage.fields.title as string}
            />
        </div>
        <Link href={`workshops/${slug}`} title={title}>
            <h3 className={styles.title}>{title}</h3>
        </Link>
        <p className={styles.text}>{description}</p>
        <Button.L href={`workshops/${slug}`} label={t.WORKSHOPS.ACTIONS.TAKE_PART} pattern={ButtonType.PRIMARY} />
    </div>
}

export default FeaturedCoursePreview;
