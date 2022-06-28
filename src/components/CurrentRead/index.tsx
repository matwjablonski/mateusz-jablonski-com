import { FC, useCallback } from "react";
import { BookType } from "../../types/common/Book.types";
import Image from 'next/image';
import Button from '../Button';
import { ButtonType } from "../Button/Button.types";
import prepareImageUrl from "../../utils/prepareImageUrl";
import styles from './CurrentRead.module.scss';

interface CurrentReadProps {
    title: string;
    author: string;
    imageUrl: string;
    affiliateLink: string;
    bookType?: BookType;
}

const CurrentRead: FC<CurrentReadProps> = ({ title, author, imageUrl, affiliateLink, bookType }) => {
    const generateLabel = useCallback(() => {
        if (bookType === 'ebook') {
            return 'Kup ebook';
        }
        if (bookType === 'audiobook') {
            return 'Kup audiobook';
        }

        return 'Kup';
    }, [bookType])

    return <div className={styles.currentRead}>
        <div className={styles.image}>
            <Image src={prepareImageUrl(imageUrl)} width={106} height={160} objectFit="cover"/>
        </div>
        <div className={styles.content}>
            <h3 className={styles.author}>{author}</h3>
            <h3 className={styles.title}>{title}</h3>
            <Button.L href={affiliateLink} pattern={ButtonType.CLEAN} label={generateLabel()} isExternal/>
        </div>
    </div>
}

export default CurrentRead;
