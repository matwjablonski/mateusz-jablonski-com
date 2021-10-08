import { Entry } from 'contentful';
import React, { FunctionComponent } from 'react';
import { Course } from '../../types/common/Course.types';
import FeaturedCoursePreview from '../FeaturedCoursePreview';

const FeaturedCourses: FunctionComponent<{ featuredCourses: Entry<Course>[]}> = ({ featuredCourses }) => {
    return <div>
        { featuredCourses.map((course) => <FeaturedCoursePreview key={course.sys.id} course={course}/>)}
    </div>
}

export default FeaturedCourses;