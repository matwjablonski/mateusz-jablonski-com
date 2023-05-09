import { Asset } from 'contentful';
import Image from 'next/image';
import { FC } from 'react';
import { Author } from '../../types/common/Author.types';
import prepareAssetUrl from '../../utils/prepareAssetUrl';
import AuthorSmallBox from '../AuthorSmallBox';
import ImagePlaceholder from '../ImagePlaceholder';
import styles from './MyPodcastHeader.module.scss';

type MyPodcastHeader = {
  name: string;
  authors: Author[];
  cover: Asset;
  description: string;
}

const MyPodcastHeader: FC<MyPodcastHeader> = ({ name, authors, cover, description }) => {
  return (
    <header className={styles.MyPodcastHeader}>
      <div className={styles.Top}>
        <div className={styles.CoverWrapper}>
          {!cover && <ImagePlaceholder width={250} height={250} withoutShadow />}
          {cover && <Image src={prepareAssetUrl(cover?.fields.file.url)} alt={name} width={250} height={250}/>}
        </div>
        <div className={styles.TopContent}>
          <h3 className={styles.Title}>{name}</h3>
          <div className={styles.Authors}>
            {authors.map(author => <AuthorSmallBox key={author.name} author={author.name} />)}
          </div>
        </div>
      </div>
      <div>
        <p className={styles.Text}>{description}</p>
      </div>
    </header>
  )
}

export default MyPodcastHeader;
