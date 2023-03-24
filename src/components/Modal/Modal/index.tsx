import { ReactNode } from "react";
import styles from './Modal.module.scss';
import Button from '../../Button';
import { ButtonType } from "../../Button/Button.types";
import { useTranslations } from '../../../hooks/useTranslations';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    subtitle: string;
    title: string;
}

const Modal = ({ isOpen, onClose, subtitle, title, children }: ModalProps) => {
    const { t } = useTranslations();

    return isOpen ? (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={onClose}/>
            <div className={styles.head}>
                <div className={styles.headContent}>
                    <h2 className={styles.subtitle}>{subtitle}</h2>
                    <h3 className={styles.title}>{title}</h3>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.back}>
                    <Button.B label={t.ARTICLE.COMMENTS.BACK} action={onClose} pattern={ButtonType.BACK}/>
                </div>
                <div className={styles.scrollable}>
                    {children}
                </div>
            </div>
        </div>
    ) : null;
}

export default Modal;
