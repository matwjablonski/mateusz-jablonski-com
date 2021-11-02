import React, { FunctionComponent } from 'react';
import { CommentsListProps } from './CommentsList.types';
import styles from './CommentsList.module.scss';

const CommentsList: FunctionComponent<CommentsListProps> = ({ comments, postId }) => {

    const actionBtn = <button onClick={() => {
        console.log('aaaa');
        fetch('/api/comments/add', { method: 'POST', body: JSON.stringify({ id: postId }) })
        }} >action</button>;

    return (
        <section className={styles.commentsWrapper}>
            <h3 className={styles.title}>Komentarze ({comments.length})</h3>
            <ul className={styles.list}>
                {
                    comments.map(comment => (
                        <li key={comment.createdDate.toString()} className={styles.comment}>
                            <h4 className={styles.author}>{comment.author || 'Anonimowy autor'}</h4>
                            <span className={styles.date}>{comment.createdDate}</span>
                            <p className={styles.text}>{comment.message}</p>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default CommentsList;