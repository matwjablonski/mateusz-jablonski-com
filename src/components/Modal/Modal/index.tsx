import { ReactNode } from "react";
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {

    return isOpen ? (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={onClose}/>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    ) : null;
}

export default Modal;