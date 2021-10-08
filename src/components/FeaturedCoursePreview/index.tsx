import { Entry } from 'contentful';
import React, { FunctionComponent } from 'react';
import { Course } from '../../types/common/Course.types';

const FeaturedCoursePreview: FunctionComponent<{ course: Entry<Course> }> = ({ course }) => {
    const { title, slug, description} = course.fields;

    return <div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
}

export default FeaturedCoursePreview;