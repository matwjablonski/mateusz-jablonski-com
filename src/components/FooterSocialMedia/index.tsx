import React, { FunctionComponent, memo } from 'react';
import styles from './FooterSocialMedia.module.scss';
import SocialMediaTile from '../SocialMediaTile';
import { SocialMediaType } from '../../types/common/SocialMedia.types';
import externalSources from '../../data/external-sources.json';
import { useTranslations } from '../../hooks/useTranslations';

const FooterSocialMedia: FunctionComponent = memo(() => {
  const { t, translate } = useTranslations();
  return (
    <section className={styles.footerSocialMedia}>
      <h2 className={styles.title}>
        {translate(t.FOOTER.SOCIAL_MEDIA.TITLE, 'span')}
      </h2>
      <div className={styles.socialMediaTiles}>
        <SocialMediaTile href={externalSources.twitter} socialMediaType={SocialMediaType.TWITTER}/>
        <SocialMediaTile href={externalSources.facebook} socialMediaType={SocialMediaType.FACEBOOK}/>
        <SocialMediaTile href={externalSources.instagram} socialMediaType={SocialMediaType.INSTAGRAM}/>
        <SocialMediaTile href={externalSources.linkedin} socialMediaType={SocialMediaType.LINKEDIN}/>
      </div>
    </section>
  )
});

FooterSocialMedia.displayName = 'FooterSocialMedia';

export default FooterSocialMedia;
