import React, { FunctionComponent, memo } from 'react';
import styles from './FooterSocialMedia.module.scss';
import SocialMediaTile from '../SocialMediaTile';
import { SocialMediaType } from '../../types/common/SocialMedia.types';

const FooterSocialMedia: FunctionComponent = memo(() => {
  return (
    <section className={styles.footerSocialMedia}>
      <h2 className={styles.title}>
        Zajrzyj na moje <span>social media!</span>
      </h2>
      <div className={styles.socialMediaTiles}>
        <SocialMediaTile href="/" socialMediaType={SocialMediaType.TWITTER}/>
        <SocialMediaTile href="https://www.facebook.com/blogmateuszjablonski/" socialMediaType={SocialMediaType.FACEBOOK}/>
        <SocialMediaTile href="/" socialMediaType={SocialMediaType.INSTAGRAM}/>
        <SocialMediaTile href="/" socialMediaType={SocialMediaType.LINKEDIN}/>
      </div>
    </section>
  )
});

export default FooterSocialMedia;
