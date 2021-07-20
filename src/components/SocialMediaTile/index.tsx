import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import Link from 'next/link'
import { SocialMediaTileProps } from './SocialMediaTile.types';
import { SocialMediaType } from '../../types/common/SocialMedia.types';

const SocialMediaTile: FunctionComponent<SocialMediaTileProps> = memo(({href, socialMediaType}) => {
  const [name, setName] = useState<string>(null);

  const prepareData = () => {
    switch (socialMediaType) {
      case SocialMediaType.TWITTER:
        setName('Twitter');
        break;
      case SocialMediaType.FACEBOOK:
        setName('Facebook');
        break;
      case SocialMediaType.INSTAGRAM:
        setName('Instagram');
        break;
      case SocialMediaType.LINKEDIN:
        setName('LinkedIn');
        break;
      case SocialMediaType.GITHUB:
        setName('GitHub');
        break;
    }
  }

  useEffect(() => {
    prepareData();
  }, [socialMediaType]);

  return (
    <Link href={href}>
      <a target="_blank" title={name} rel="noopener noreferrer nofollow">
        <div>

        </div>
        {name}
      </a>
    </Link>
  )
})

export default SocialMediaTile;
