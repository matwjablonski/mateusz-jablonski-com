import { useTranslations } from '../../hooks/useTranslations';
import { Wrapper, Title, SourcesLine, SourceLink, Icon } from './ui';
import ApplePodcastIcon from '../../public/icons/applepodcast-ico.svg';
import SpofifyIcon from '../../public/icons/spotify.svg';
import YoutubeIcon from '../../public/icons/youtube-small-icon.svg';
import GooglePodcastsIcon from '../../public/icons/googlepodcasts-ico.svg';

const PodcastSources = ({ applepodcast, spotify, youtube, googlepodcast }) => {
  const { t } = useTranslations();

  return (
    <Wrapper>
      <Title>{t.PODCAST.COMMON.SOURCES_TITLE_DOUBLE}</Title>
      <SourcesLine>
        {applepodcast && <SourceLink href={applepodcast} target="_blank" >
          <Icon src={ApplePodcastIcon} alt="Apple Podcast" />
        </SourceLink>}
        {spotify && <SourceLink href={spotify} target="_blank" >
          <Icon src={SpofifyIcon} alt="Spotify" />
        </SourceLink>}
        {googlepodcast && <SourceLink href={googlepodcast} target="_blank" >
          <Icon src={GooglePodcastsIcon} alt="Google Podcasts" />
        </SourceLink>}
        {youtube && <SourceLink href={youtube} target="_blank" >
          <Icon src={YoutubeIcon} alt="Youtube" />
        </SourceLink>}
      </SourcesLine>
    </Wrapper>
  )
}

export default PodcastSources;
