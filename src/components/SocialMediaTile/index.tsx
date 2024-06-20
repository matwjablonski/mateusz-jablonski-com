import React, { FunctionComponent, memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { SocialMediaTileProps } from './SocialMediaTile.types';
import { SocialMediaType } from '../../types/common/SocialMedia.types';
import styles from './SocialMediaTile.module.scss';
import cx from 'classnames';
import x from '../../public/icons/x.svg';
import facebook from '../../public/icons/facebook.svg';
import li from '../../public/icons/li.svg';
import instagram from '../../public/icons/instagram.svg';

const SocialMediaTile: FunctionComponent<SocialMediaTileProps> = memo(({href, socialMediaType}) => {
  const [name, setName] = useState<string>(null);
  const [className, setClassName] = useState<string>(null);

  const prepareData = useCallback(() => {
    switch (socialMediaType) {
      case SocialMediaType.TWITTER:
        setName('X.com');
        setClassName('x');
        break;
      case SocialMediaType.FACEBOOK:
        setName('Facebook');
        setClassName('facebook');
        break;
      case SocialMediaType.INSTAGRAM:
        setName('Instagram');
        setClassName('instagram');
        break;
      case SocialMediaType.LINKEDIN:
        setName('LinkedIn');
        setClassName('linkedin');
        break;
      case SocialMediaType.GITHUB:
        setName('GitHub');
        setClassName('github');
        break;
    }
  }, [socialMediaType])

  const prepareIcon = () => {
    switch(socialMediaType) {
      case SocialMediaType.TWITTER:
        return <Image src={x || `/icons/x.svg`} width={60} height={48} alt=""/>;
      case SocialMediaType.FACEBOOK:
        return <Image src={facebook || `/icons/facebook.svg`} width={33} height={54} alt=""/>;
      case SocialMediaType.INSTAGRAM:
        return <Image src={instagram || `/icons/instagram.svg`} width={72} height={72} alt=""/>;
      case SocialMediaType.LINKEDIN:
        return <Image src={li || `/icons/li.svg`} width={72} height={72} alt=""/>;
      case SocialMediaType.GITHUB:
        return <Image src={x || `/icons/twitter.svg`} width={49} height={6} alt=""/>;
    }    
  }

  useEffect(() => {
    prepareData();
  }, [prepareData]);

  return (
    <a target="_blank" title={name} rel="noopener noreferrer nofollow" className={styles.socialMediaLink} href={href}>
      <div className={styles.socialTile}>
        <div className={cx(styles.icon, styles[className])}>
          {prepareIcon()}
        </div>
        <div className={styles.name}>
          {name}
        </div>
      </div>
    </a>
  )
});

SocialMediaTile.displayName = 'SocialMediaTile';

export default SocialMediaTile;
