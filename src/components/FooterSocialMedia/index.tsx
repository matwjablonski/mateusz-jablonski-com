import React, { FunctionComponent, memo } from 'react';
import styles from './FooterSocialMedia.module.scss';
import SocialMediaTile from '../SocialMediaTile';
import { SocialMediaType } from '../../types/common/SocialMedia.types';
import externalSources from '../../data/external-sources.json';
import { useTranslations } from '../../hooks/useTranslations';
import { Tiles, Title, Wrapper } from './ui';

const FooterSocialMedia: FunctionComponent<{ dark: boolean }> = memo(({ dark }) => {
  const { t, translate } = useTranslations();
  return (
    <Wrapper>
      <Title dark={dark}>
        {translate({ value: t.FOOTER.SOCIAL_MEDIA.TITLE, tagName: 'span' })}
      </Title>
      <Tiles>
        <SocialMediaTile href={externalSources.twitter} socialMediaType={SocialMediaType.TWITTER} key={SocialMediaType.TWITTER}/>
        <SocialMediaTile href={externalSources.facebook} socialMediaType={SocialMediaType.FACEBOOK} key={SocialMediaType.FACEBOOK}/>
        <SocialMediaTile href={externalSources.instagram} socialMediaType={SocialMediaType.INSTAGRAM} key={SocialMediaType.INSTAGRAM}/>
        <SocialMediaTile href={externalSources.linkedin} socialMediaType={SocialMediaType.LINKEDIN} key={SocialMediaType.LINKEDIN}/>
      </Tiles>
    </Wrapper>
  )
});

FooterSocialMedia.displayName = 'FooterSocialMedia';

export default FooterSocialMedia;
