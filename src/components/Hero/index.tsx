import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { HeroProps } from './Hero.types';
import styles from './Hero.module.scss';
import PageTitle from '../Title';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import { useTranslations } from '../../hooks/useTranslations';

const Hero: FunctionComponent<HeroProps> = ({ title, description, image }) => {
    const { t } = useTranslations();

    const prepareTitle = () => {
        const titleWithoutClosingStrong = title.replace('</strong>', '');
        const titleArr = titleWithoutClosingStrong.split('<strong>');
    
        return <PageTitle classes={styles.title} capitalize>{titleArr[0]}<strong>{titleArr[1]}</strong></PageTitle>
    }

    return (
        <section className={styles.hero}>
            <div className={styles.contentWrapper}>
                {prepareTitle()}
                <p className={styles.text}>{description}</p>
                <div className={styles.buttons}>
                    <Button.L 
                        href="/blog"
                        pattern={ButtonType.PRIMARY}
                        label={t.HOME.HERO.FREE_CONTENT_ACTION}
                    />
                    <Button.L
                        href="/about"
                        className={styles.secondButton}
                        pattern={ButtonType.CLEAN}
                        label={t.HOME.HERO.ABOUT_ACTION}
                    />
                </div>
            </div>
            <div className={styles.imageWrapper}>
                {/* <Image
                    src={prepareImageUrl(image.fields.file.url)}
                    alt={image.fields.title}
                    width={430}
                    height={530} 
                    className={styles.image}
                /> */}
            </div>
        </section>
    )
};

export default Hero;
