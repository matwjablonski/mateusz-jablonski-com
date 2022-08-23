import { FC, useCallback } from "react";
import { BookSeller, BookType } from "../../types/common/Book.types";
import Image from 'next/image';
import styles from './BuyBook.module.scss';
import Button from '../Button';
import { ButtonType } from "../Button/Button.types";
import prepareImageUrl from "../../utils/prepareAssetUrl";

const BuyBook: FC<{ affiliateLink: string, seller: BookSeller, bookType?: BookType }> = ({ affiliateLink, seller, bookType }) => {
    const generateLabel = useCallback(() => {
        if (bookType === 'ebook') {
            return 'Kup ebook';
        }
        if (bookType === 'audiobook') {
            return 'Kup audiobook';
        }

        return 'Kup';
    }, [bookType])

    return affiliateLink ? (
            <div className={styles.affiliateBox}>
                <Button.L href={affiliateLink} label={generateLabel()} pattern={ButtonType.PRIMARY} isExternal/>
                {
                    seller && (
                        <div className={styles.seller}>
                            <p>poprzez</p> 
                            <div className={styles.sellerLogo}>
                                <Image 
                                    src={prepareImageUrl(seller.logo.fields.file.url)}
                                    title={seller.name}
                                    objectFit="contain"
                                    width={75}
                                    height={25}
                                    alt={seller.name}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        ) : null;
    
}

export default BuyBook;