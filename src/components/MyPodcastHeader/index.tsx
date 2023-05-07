import { Asset } from 'contentful';
import Image from 'next/image';
import { FC } from 'react';
import { Author } from '../../types/common/Author.types';
import prepareAssetUrl from '../../utils/prepareAssetUrl';
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
          {cover && <Image src={prepareAssetUrl(cover?.fields.file.url)} alt="" width={200} height={200}/>}
        </div>
        <div className={styles.TopContent}>
          <h3 className={styles.Title}>{name}</h3>
          <div className={styles.Authors}>
            {authors.map(author => <p key={author.name}>{author.name}</p>)}
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
