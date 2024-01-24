import Image from 'next/image';
import { useTranslations } from '../../hooks/useTranslations';
import { CommentsIcon, Wrapper } from './ui';
import commentsIcon from '../../public/icons/comments.svg';

const PodcastCommentsSidebar = ({ numberOfComments, commentsBlockRef }) => {
  const { t } = useTranslations();

  const handleGoToCommentsBlock = () => {
    if (commentsBlockRef.current) {
        commentsBlockRef.current.scrollIntoView({ behavior: 'smooth'})
    }
  }

  return (
    <Wrapper onClick={handleGoToCommentsBlock}>
      {t.PODCAST.COMMON.COMMENTS} 
      <CommentsIcon>
        <Image src={commentsIcon} width={24} height={24} alt=""/>
      </CommentsIcon>
      {numberOfComments}
    </Wrapper>
  )
}

export default PodcastCommentsSidebar;
