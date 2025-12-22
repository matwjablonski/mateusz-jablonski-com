import { FC } from "react";
import Image from 'next/image';
import { Book } from "../../types/common/Book.types";
import styles from './RecommendedBook.module.scss';
import prepareImageUrl from "../../utils/prepareAssetUrl";
import BuyBook from "../BuyBook";

const RecommendedBook: FC<{book: Book}> = ({ book: { title, cover, author, affiliateLink, seller }}) => {
    return <div className={styles.recommendedBook}>
        <div className={styles.content}>
            <h3 className={styles.sectionTitle}>Warto przeczytać w tym temacie</h3>
            <div className={styles.bookWrapper}>
                <div className={styles.bookImageWrapper}>
                    <Image
                        src={prepareImageUrl(cover.fields.file.url as string)}
                        alt={cover.fields.title as string}
                        height={160}
                        width={106}
                    />
                </div>
                <div className={styles.bookInfo}>
                    <h4 className={styles.author}>{author}</h4>
                    <h4 className={styles.title}>{title}</h4>
                    {seller && <BuyBook affiliateLink={affiliateLink} seller={seller.fields} />}
                </div>
            </div>
        </div>
    </div>
}

export default RecommendedBook;
