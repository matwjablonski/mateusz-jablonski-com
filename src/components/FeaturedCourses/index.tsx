import { Entry } from 'contentful';
import React, { FunctionComponent } from 'react';
import { Course } from '../../types/common/Course.types';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import FeaturedCoursePreview from '../FeaturedCoursePreview';
import styles from './FeaturedCourses.module.scss';

const FeaturedCourses: FunctionComponent<{ featuredCourses: Entry<Course>[]}> = ({ featuredCourses }) => (
    <div className={styles.section}>
        <div className={styles.wrapper}>
            { featuredCourses.map((course) => <FeaturedCoursePreview key={course.sys.id} course={course}/>)}
        </div>
        <Button.L label="Wszystkie kursy" pattern={ButtonType.WHITE} href="/courses"/>
    </div>
)

export default FeaturedCourses;