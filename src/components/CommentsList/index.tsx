import React, { FunctionComponent, useState } from 'react';
import { CommentsListProps } from './CommentsList.types';
import styles from './CommentsList.module.scss';
import UserAvatar from '../UserAvatar';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import ModalsPortal from '../Modal/ModalsPortal';
import Modal from '../Modal/Modal';
import CommentAddForm from '../CommentAddForm';
import { useTranslations } from '../../hooks/useTranslations';
import { formatAuthorName } from '../../utils/formatAuthorName';

const CommentsList: FunctionComponent<CommentsListProps> = ({ comments, postId, title }) => {
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const { t } = useTranslations();

    return (
        <section className={styles.commentsWrapper}>
            <div className={styles.commentsHead}>
                <h3 className={styles.title}>{t.ARTICLE.COMMENTS.TITLE} <strong>({comments.length})</strong></h3>
                <Button.B pattern={ButtonType.PRIMARY} label={t.ARTICLE.COMMENTS.ADD} action={() => setIsCommentsModalOpen(true)} />
            </div>
            <ul className={styles.list}>
                {
                    comments.length > 0 ?
                        comments.map(comment => (
                            <li key={comment.createdDate.toString()} className={styles.comment}>
                                <div className={styles.meta}>
                                    <UserAvatar email={comment?.email} />
                                    <div>
                                        <h4 className={styles.author}>{formatAuthorName(comment.author) || t.ARTICLE.COMMENTS.NO_NAME}</h4>
                                        <span className={styles.date}>{comment.createdDate}</span>
                                    </div>
                                </div>
                                <p className={styles.text}>{comment.message}</p>
                            </li>
                        )) :
                        t.ARTICLE.COMMENTS.FIRST_MESSAGE
                }
            </ul>
            <ModalsPortal>
                <Modal 
                    isOpen={isCommentsModalOpen}
                    onClose={() => setIsCommentsModalOpen(false)}
                    subtitle={t.ARTICLE.COMMENTS.COMMENTING_TITLE}
                    title={title}
                >
                    <CommentAddForm postId={postId} onClose={() => setIsCommentsModalOpen(false)}/>
                </Modal>
            </ModalsPortal>
        </section>
    )
}

export default CommentsList;
