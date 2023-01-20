import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FC } from 'react';
import { CourseProgramProps } from './CourseProgram.types';

const options = {
  renderNode: {}
};

const CourseProgram: FC<CourseProgramProps> = ({ content }) => {
  return <div>
    <h2>Program</h2>
    {documentToReactComponents(content, options)}
  </div>
}

export default CourseProgram;
