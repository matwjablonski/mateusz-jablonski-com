import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostAuthorProps } from './PostAuthor.types';
import styles from './PostAuthor.module.scss';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import TwitterIcon from '../../public/icons/twitter-bold-white.svg';
import LiIcon from '../../public/icons/li-bold.svg';
import FacebookIcon from '../../public/icons/facebook-bold.svg';
import GithubIcon from '../../public/icons/github-bold.svg';
import InstagramIcon from '../../public/icons/instagram-bold.svg';
import { useTranslations } from '../../hooks/useTranslations';

const PostAuthor: FunctionComponent<PostAuthorProps> = ({ author }) => {
    const { t } = useTranslations();
    return (
        <div className={styles.authorWrapper}>
            <div className={styles.authorImage}>
                {
                    author.image ? 
                        <div /> :
                        // <Image src={prepareImageUrl(author.image.fields.file.url)} width={197} height={197} className={styles.image} alt={author.name} /> :
                        <div />
                }
            </div>
            <div className={styles.content}>
                <h3 className={styles.sectionTitle}>{t.ARTICLE.AUTHOR.TITLE}</h3>
                <h2 className={styles.authorName}>{author.name}</h2>
                <div className={styles.authorBio}>
                    {documentToReactComponents(author.shortBiography, {})}
                </div>
                <h4 className={styles.socialTitle}>{t.ARTICLE.AUTHOR.YOU_WILL_FIND_ME}</h4>
                <ul className={styles.socials}>
                    { author.twitter && (
                        <li className={styles.socialItem}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} href={author.twitter}>
                                <div className={styles.icon}>
                                    <Image src={TwitterIcon} width={20} height={16} alt=""/>
                                </div> 
                                Twitter
                            </a>
                        </li>
                        )
                    }
                    { author.linkedIn && (
                        <li className={styles.socialItem}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} href={author.linkedIn}>
                                <div className={styles.icon}>
                                    <Image src={LiIcon} width={16} height={16} alt=""/>
                                </div> 
                                LinkedIn
                            </a>
                        </li>
                        )
                    }
                    { author.facebook && (
                        <li className={styles.socialItem}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} href={author.facebook}>
                                <div className={styles.icon}>
                                    <Image src={FacebookIcon} width={11} height={18} alt=""/>
                                </div> 
                                Facebook
                            </a>
                        </li>
                        )
                    }
                    { author.github && (
                        <li className={styles.socialItem}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} href={author.github}>
                                <div className={styles.icon}>
                                    <Image src={GithubIcon} width={17} height={18} alt=""/>
                                </div> 
                                GitHub
                            </a>
                        </li>
                        )
                    }
                    { author.instagram && (
                        <li className={styles.socialItem}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} href={author.instagram}>
                                <div className={styles.icon}>
                                    <Image src={InstagramIcon} width={16} height={16} alt=""/>
                                </div> 
                                Instagram
                            </a>
                        </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default PostAuthor;
