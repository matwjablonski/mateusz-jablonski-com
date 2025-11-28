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
        <SocialMediaTile href={externalSources.buycoffee} socialMediaType={SocialMediaType.BUYCOFFEE} key={SocialMediaType.BUYCOFFEE}/>
        <SocialMediaTile href={externalSources.github} socialMediaType={SocialMediaType.GITHUB} key={SocialMediaType.GITHUB}/>
        <SocialMediaTile href={externalSources.linkedin} socialMediaType={SocialMediaType.LINKEDIN} key={SocialMediaType.LINKEDIN}/>
      </Tiles>
    </Wrapper>
  )
});

FooterSocialMedia.displayName = 'FooterSocialMedia';

export default FooterSocialMedia;
