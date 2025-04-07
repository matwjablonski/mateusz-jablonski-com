import Columns from '../Columns';
import styles from './MyStory.module.scss';
import Lo from '../../public/images/about/lo.jpg';
import Company from '../../public/images/about/pierwsza-firma.jpg';
import Sonalake from '../../public/images/about/sonalake.jpg';
import Image from 'next/image';
import { useTranslations } from '../../hooks/useTranslations';

const MyStory = () => {
    const { t } = useTranslations();

    return (
        <section className={styles.myStory}>
            <div className={styles.row}>
                <Columns>
                    <div className={styles.episode}>
                        <h2>{t.ABOUT.STORY.TITLE}</h2>
                        <p>{t.ABOUT.STORY.INTRO}</p>
                        <blockquote className={styles.blockquote}>
                            <p>{t.ABOUT.STORY.BLOCKQUOTE}</p>
                        </blockquote>
                    </div>
                    <div>
                        <figure className={styles.image}>
                            <Image src={Lo} alt={t.ABOUT.STORY.PHOTO_1_CAPTION}/>
                            <figcaption>{t.ABOUT.STORY.PHOTO_1_CAPTION}</figcaption>
                        </figure>
                    </div>
                </Columns>
            </div>
            <div className={styles.row}>
                <Columns>
                    <div>
                        <figure className={styles.image}>
                            <Image src={Company} alt={t.ABOUT.STORY.PHOTO_2_CAPTION}/>
                            <figcaption>{t.ABOUT.STORY.PHOTO_2_CAPTION}</figcaption>
                        </figure>
                    </div>
                    <div className={styles.episode}>
                        <p>{t.ABOUT.STORY.EPISODE_1_1}</p>
                        <p>{t.ABOUT.STORY.EPISODE_1_2}</p>
                        <p>{t.ABOUT.STORY.EPISODE_1_3}</p>
                    </div>
                </Columns>
            </div>
            <div className={styles.lastRow}>
                <Columns>
                    <div className={styles.episode}>
                        <p>{t.ABOUT.STORY.EPISODE_2_1}</p>
                        <p>{t.ABOUT.STORY.EPISODE_2_2}</p>
                        <p>{t.ABOUT.STORY.EPISODE_2_3}</p>
                    </div>
                    <div>
                        <figure className={styles.image}>
                            <Image src={Sonalake} alt={t.ABOUT.STORY.PHOTO_3_CAPTION}/>
                            <figcaption>{t.ABOUT.STORY.PHOTO_3_CAPTION}</figcaption>
                        </figure>
                    </div>
                </Columns>
            </div>
        </section>
    )
}

export default MyStory;
