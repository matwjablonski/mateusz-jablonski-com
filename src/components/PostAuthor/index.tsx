import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostAuthorProps } from './PostAuthor.types';
import styles from './PostAuthor.module.scss';
import prepareImageUrl from '../../utils/prepareImageUrl';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import TwitterIcon from '../../public/icons/twitter-bold-white.svg';
import LiIcon from '../../public/icons/li-bold.svg';
import FacebookIcon from '../../public/icons/facebook-bold.svg';
import GithubIcon from '../../public/icons/github-bold.svg';
import InstagramIcon from '../../public/icons/instagram-bold.svg';

const PostAuthor: FunctionComponent<PostAuthorProps> = ({ author }) => {
    return (
        <div className={styles.authorWrapper}>
            <div className={styles.authorImage}>
                {
                    author.image ? 
                        <Image src={prepareImageUrl(author.image.fields.file.url)} width={197} height={197} className={styles.image} alt={author.name} /> :
                        <div />
                }
            </div>
            <div className={styles.content}>
                <h3 className={styles.sectionTitle}>O autorze</h3>
                <h2 className={styles.authorName}>{author.name}</h2>
                <div className={styles.authorBio}>
                    {documentToReactComponents(author.shortBiography, {})}
                </div>
                <h4 className={styles.socialTitle}>Znajdziesz mnie</h4>
                <ul className={styles.socials}>
                    { author.twitter && (
                        <li className={styles.socialItem}>
                            <Link href={author.twitter}>
                                <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                    <div className={styles.icon}>
                                        <Image src={TwitterIcon} width={20} height={16} alt=""/>
                                    </div> 
                                    Twitter
                                </a>
                            </Link>
                        </li>
                        )
                    }
                    { author.linkedIn && (
                        <li className={styles.socialItem}>
                            <Link href={author.linkedIn}>
                                <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                    <div className={styles.icon}>
                                        <Image src={LiIcon} width={16} height={16} alt=""/>
                                    </div> 
                                    LinkedIn
                                </a>
                            </Link>
                        </li>
                        )
                    }
                    { author.facebook && (
                        <li className={styles.socialItem}>
                            <Link href={author.facebook}>
                                <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                    <div className={styles.icon}>
                                        <Image src={FacebookIcon} width={11} height={18} alt=""/>
                                    </div> 
                                    Facebook
                                </a>
                            </Link>
                        </li>
                        )
                    }
                    { author.github && (
                        <li className={styles.socialItem}>
                            <Link href={author.github}>
                                <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                    <div className={styles.icon}>
                                        <Image src={GithubIcon} width={17} height={18} alt=""/>
                                    </div> 
                                    GitHub
                                </a>
                            </Link>
                        </li>
                        )
                    }
                    { author.instagram && (
                        <li className={styles.socialItem}>
                            <Link href={author.instagram}>
                                <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                    <div className={styles.icon}>
                                        <Image src={InstagramIcon} width={16} height={16} alt=""/>
                                    </div> 
                                    Instagram
                                </a>
                            </Link>
                        </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default PostAuthor;
