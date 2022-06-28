import { FC } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Book } from "../../types/common/Book.types";
import styles from './RecommendedBook.module.scss';
import prepareImageUrl from "../../utils/prepareImageUrl";
import Button from '../Button'
import { ButtonType } from "../Button/Button.types";

const RecommendedBook: FC<{book: Book}> = ({ book: { title, cover, author, affiliateLink, slug, review, seller }}) => {
    console.log(seller);
    return <div className={styles.recommendedBook}>
        <div className={styles.content}>
            <h3 className={styles.sectionTitle}>Warto przeczytać w tym temacie</h3>
            <div className={styles.bookWrapper}>
                <div>
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
                    {
                        affiliateLink && (
                            <div className={styles.affiliateBox}>
                                <Button.L href={affiliateLink} label="Kup" pattern={ButtonType.PRIMARY} isExternal/>
                                {
                                    seller && (
                                        <div className={styles.seller}>
                                            <p>poprzez</p> 
                                            <div className={styles.sellerLogo}>
                                                <Image 
                                                    src={prepareImageUrl(seller.fields.logo.fields.file.url)}
                                                    objectFit="contain"
                                                    width={75}
                                                    height={25}
                                                    alt={seller.fields.name}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
}

export default RecommendedBook;