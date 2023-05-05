import { EntrySkeletonType, Entry } from 'contentful';
import React, { FunctionComponent } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { Course } from '../../types/common/Course.types';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import FeaturedCoursePreview from '../FeaturedCoursePreview';
import styles from './FeaturedCourses.module.scss';

const FeaturedCourses: FunctionComponent<{ featuredCourses: Entry<EntrySkeletonType<Course>>[]}> = ({ featuredCourses }) => {
    const { t } = useTranslations();
    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                { featuredCourses.map((course) => <FeaturedCoursePreview key={course.sys.id} course={course.fields as Course}/>)}
            </div>
            <Button.L label={t.WORKSHOPS.ACTIONS.ALL} pattern={ButtonType.WHITE} href="/course"/>
        </div>
    )
}

export default FeaturedCourses;
