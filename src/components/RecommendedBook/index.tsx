import { FC } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Book } from "../../types/common/Book.types";
import styles from './RecommendedBook.module.scss';
import prepareImageUrl from "../../utils/prepareImageUrl";
import Button from '../Button'
import { ButtonType } from "../Button/Button.types";
import BuyBook from "../BuyBook";

const RecommendedBook: FC<{book: Book}> = ({ book: { title, cover, author, affiliateLink, slug, review, seller }}) => {
    return <div className={styles.recommendedBook}>
        <div className={styles.content}>
            <h3 className={styles.sectionTitle}>Warto przeczytać w tym temacie</h3>
            <div className={styles.bookWrapper}>
                <div className={styles.bookImageWrapper}>
                    <Image
                        src={prepareImageUrl(cover.fields.file.url)}
                        alt={cover.fields.title}
                        objectFit="cover"
                        height={160}
                        width={106}
                    />
                </div>
                <div className={styles.bookInfo}>
                    <h4 className={styles.author}>{author}</h4>
                    {
                        !!review ? 
                            <Link href={`/book/${slug}`}>
                                <a><h4 className={styles.title}>{title}</h4></a>
                            </Link> : 
                            <h4 className={styles.title}>{title}</h4>
                    }
                    <BuyBook affiliateLink={affiliateLink} seller={seller.fields} />
                </div>
            </div>
        </div>
    </div>
}

export default RecommendedBook;