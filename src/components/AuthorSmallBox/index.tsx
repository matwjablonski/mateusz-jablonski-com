import { FC, memo } from 'react';
import styles from './AuthorSmallBox.module.scss';

type AuthorSmallBox = {
  author: string;
}

const AuthorSmallBox: FC<AuthorSmallBox> = memo(({ author }) => {
  return (
    <div className={styles.AuthorSmallBox}>
      {author}
    </div>
  )
});

AuthorSmallBox.displayName = 'MemoizedAuthorSmallBox';

export default AuthorSmallBox;
