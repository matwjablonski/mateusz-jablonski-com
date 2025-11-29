import React, { FunctionComponent } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import FeaturedCoursePreview from '../FeaturedCoursePreview';
import styles from './FeaturedCourses.module.scss';
import { Workshop } from '../../types/database';

const FeaturedCourses: FunctionComponent<{ featuredCourses: Workshop[]}> = ({ featuredCourses }) => {
    const { t, translateByFullKey } = useTranslations();
    
    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                { featuredCourses.map((workshop) => <FeaturedCoursePreview 
                    key={workshop.id}
                    title={translateByFullKey(workshop.name)} 
                    description={translateByFullKey(workshop.description)}
                    slug={workshop.slug} days={workshop.days} level={workshop.level}
                />)}
            </div>
            <Button.L label={t.WORKSHOPS.ACTIONS.ALL} pattern={ButtonType.WHITE} href="/workshops"/>
        </div>
    )
}

export default FeaturedCourses;
