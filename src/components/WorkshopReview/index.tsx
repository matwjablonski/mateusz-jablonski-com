import { useTranslations } from '../../hooks/useTranslations';
import { Content, Meta, Name, ReviewBox, Date, NameAndDate } from './ui';

const WorkshopReview = ({ name, content, rate, date }) => {
  const { t } = useTranslations();

  return (
    <ReviewBox>
      <Content>{content}</Content>
      <Meta>
        <NameAndDate>
          <Name>{name ?? t.WORKSHOPS.REVIEWS.ANONYMOUS_USER}</Name>
          <Date>{date}</Date>
        </NameAndDate>
      </Meta>
    </ReviewBox>
  );
};

export default WorkshopReview;
