import { FC, useMemo } from 'react';
import prepareUrl from '../../utils/prepareAssetUrl';
import dynamic from 'next/dynamic';
import { Wrapper } from './ui';

type PodcastPlayerSection = {
  file: any;
  externalLink: any;
  podcastCover: any;
  title: string;
  createdDate: Date;
  time: number;
}

const DynamicPlayer = dynamic(
  () => import('../../components/Player'),
  { ssr: false }
);

const PodcastPlayerSection: FC<PodcastPlayerSection> = ({ file, podcastCover, createdDate, title, time }) => {
  const fileUrlToLoad = useMemo(() => {
    if (file) {
      return prepareUrl(file?.fields?.file?.url as string);
    }

    return null;
  }, [file]);

  return (
    <Wrapper>
      {(fileUrlToLoad) && <DynamicPlayer
        cover={podcastCover}
        title={title}
        createdDate={createdDate}
        time={time}
        description={file?.fields?.description as string || title}
        file={fileUrlToLoad}
        podcastCover={podcastCover}
      />}
    </Wrapper>
  )
}

export default PodcastPlayerSection;
