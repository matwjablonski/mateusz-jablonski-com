import React, { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document} from '@contentful/rich-text-types';
import { Asset } from 'contentful';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import { ButtonBox, Content, ContentBox, Dots, Title } from './ui';
import { useTranslations } from '../../hooks/useTranslations';
import { options } from './options';

interface PodcastContentProps {
  content: Document;
  podcastExcerpt?: Document;
  className?: string;
  createdDate?: Date;
  file: Asset;
  fileUrl?: string;
  title: string;
  podcastCover?: Asset;
  externalLink?: string;
  video?: string;
  time?: number;
}

const PodcastContent = ({content, file, video }: PodcastContentProps) => {
  const [ isTruncated, setIsTruncated ] = useState(true);
  const { t } = useTranslations();

  const handleReadMore = () => {
    setIsTruncated(false);
  }

  if (!content) {
    return null
  }

  return (
    <Content>
      {video && <>
        <Title>Wideo</Title>
        <Dots />
      </>}
      <Title>{t.PODCAST.COMMON.TRANSCRIPTION}</Title>
      <ContentBox isTruncated={isTruncated}>
        {documentToReactComponents(content, options)}
      </ContentBox>
      {isTruncated && <ButtonBox>
        <Button.B
          label={t.PODCAST.COMMON.READ_MORE}
          pattern={ButtonType.PRIMARY}
          action={handleReadMore}  
        />
      </ButtonBox>}
      <Dots />
    </Content>
  )
}

export default PodcastContent;
