import React, { FunctionComponent, useState } from 'react';
import { CommentsListProps } from './CommentsList.types';
import styles from './CommentsList.module.scss';
import UserAvatar from '../UserAvatar';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import ModalsPortal from '../Modal/ModalsPortal';
import Modal from '../Modal/Modal';
import CommentAddForm from '../CommentAddForm';

const CommentsList: FunctionComponent<CommentsListProps> = ({ comments, postId }) => {
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

    return (
        <section className={styles.commentsWrapper}>
            <div className={styles.commentsHead}>
                <h3 className={styles.title}>Komentarze <strong>({comments.length})</strong></h3>
                <Button.B pattern={ButtonType.PRIMARY} label="Dodaj komentarz" action={() => setIsCommentsModalOpen(true)} />
            </div>
            <ul className={styles.list}>
                {
                    comments.length > 0 ?
                        comments.map(comment => (
                            <li key={comment.createdDate.toString()} className={styles.comment}>
                                <div className={styles.meta}>
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
            <ModalsPortal>
                <Modal isOpen={isCommentsModalOpen} onClose={() => setIsCommentsModalOpen(false)}>
                    <CommentAddForm postId={postId} onClose={() => setIsCommentsModalOpen(false)}/>
                </Modal>
            </ModalsPortal>
        </section>
    )
}

export default CommentsList;
