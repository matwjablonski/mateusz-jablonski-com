import React, { FunctionComponent } from 'react';
import { Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '../../types/common/Course.types';
import styles from './FeaturedCoursePreview.module.scss';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import placeholder from '../../public/placeholder.png';
import prepareImageUrl from '../../utils/prepareImageUrl';

const FeaturedCoursePreview: FunctionComponent<{ course: Entry<Course> }> = ({ course }) => {
    const { title, slug, description, featuredImage} = course.fields;

    return <div className={styles.course}>
        <div className={styles.imageBox}>
            <Image src={featuredImage ? prepareImageUrl(featuredImage.fields.file.url) : placeholder} width={544} height={256} className={styles.image}/>
        </div>
        <Link href={`course/${slug}`}>
            <a title={title}>
                <h3 className={styles.title}>{title}</h3>
            </a>
        </Link>
        <p className={styles.text}>{description}</p>
        <Button.L href={`course/${slug}`} label="Wejdź do kursu" pattern={ButtonType.PRIMARY} />
    </div>
}

export default FeaturedCoursePreview;