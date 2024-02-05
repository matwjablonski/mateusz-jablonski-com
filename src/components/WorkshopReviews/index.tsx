import { useTranslations } from '../../hooks/useTranslations';
import WorkshopReview from '../WorkshopReview';
import { Reviews, Title, Wrapper } from './ui';

const WorkshopReviews = ({ reviews = [] }) => {
  const { t } = useTranslations();
  return (
    <Wrapper>
      <Title>{t.WORKSHOPS.REVIEWS.TITLE}</Title>
      {reviews.length && <Reviews>
        {reviews.map((review, index) => (
          <WorkshopReview
            key={index}
            {...review}  
          />            
        ))}
      </Reviews>}
      {reviews.length === 0 && t.WORKSHOPS.REVIEWS.NO_REVIEWS}
    </Wrapper>
  );
};

export default WorkshopReviews;
