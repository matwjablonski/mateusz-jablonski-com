import React, { FunctionComponent } from 'react';
import { CommentsListProps } from './CommentsList.types';
import styles from './CommentsList.module.scss';
import UserAvatar from '../UserAvatar';

const CommentsList: FunctionComponent<CommentsListProps> = ({ comments, postId }) => {

    const actionBtn = <button onClick={() => {
        console.log('aaaa');
        fetch('/api/comments/add', { method: 'POST', body: JSON.stringify({ id: postId }) })
        }} >action</button>;

    return (
        <section className={styles.commentsWrapper}>
            <h3 className={styles.title}>Komentarze <strong>({comments.length})</strong></h3>
            <ul className={styles.list}>
                {
                    comments.length > 0 ?
                        comments.map(comment => (
                            <li key={comment.createdDate.toString()} className={styles.comment}>
                                <div className={styles.meta}>
                                    {console.log(comment)}
                                    <UserAvatar email={comment?.email} />
                                    <div>
                                        <h4 className={styles.author}>{comment.author || 'Anonimowy autor'}</h4>
                                        <span className={styles.date}>{comment.createdDate}</span>
                                    </div>
                                </div>
                                <p className={styles.text}>{comment.message}</p>
                            </li>
                        )) :
                        'Chwilowo brak komentarzy'
                }
            </ul>
        </section>
    )
}

export default CommentsList;
