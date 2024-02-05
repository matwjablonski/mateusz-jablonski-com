import { Content, ReviewBox } from './ui';

const WorkshopReview = ({ name, content, rate, date }) => {
  return (
    <ReviewBox>
      <Content>{content}</Content>
    </ReviewBox>
  );
};

export default WorkshopReview;
