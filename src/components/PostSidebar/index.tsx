import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PostSidebar.module.scss';
import { PostSidebarProps } from './PostSidebar.types';
import commentsIcon from '../../public/icons/comments.svg';
import TwitterIcon from '../../public/icons/twitter-bold.svg';
import FacebookIcon from '../../public/icons/facebook-bold-color.svg';
import LiIcon from '../../public/icons/li-bold-color.svg';
import MailIcon from '../../public/icons/mail.svg';

const PostSidebar: FunctionComponent<PostSidebarProps> = ({ author, numberOfComments, commentsBlockRef}) => {
    const sidebar = useRef<HTMLDivElement>(null);
    const [ sidebarHeight, setSidebarHeight ] = useState(0);
    const [ wideAssetsPositions, setWideAssetsPositions ] = useState([]);

    const handleGoToCommentsBlock = () => {
        if (commentsBlockRef.current) {
            commentsBlockRef.current.scrollIntoView({ behavior: 'smooth'})
        }
    }

    const calculateVisibilityOfSidebar = useCallback(() => {
        const changeYFactor = 100;
        const heightFactor = 50;
        const sidebarPosition = window.scrollY + sidebarHeight + heightFactor;

        if (!wideAssetsPositions.length) {
            return;
        }

        const closest = wideAssetsPositions.reduce((prev, curr) => {
            return (Math.abs(curr[0] - (window.scrollY - changeYFactor)) < Math.abs(prev[0] - (window.scrollY - changeYFactor)) ? curr : prev);
        });

        if (!sidebar.current) {
            return;
        }

        if (sidebarPosition > closest[0] && window.scrollY < closest[1]) {
            sidebar.current.style.opacity = '0';
        } else {
            sidebar.current.style.opacity = '1';
        }
    }, [sidebarHeight, wideAssetsPositions]);

    const scrollAction = useCallback(() => {
        if (typeof window !== undefined && sidebar) {
            window.onscroll = calculateVisibilityOfSidebar;
        }
    }, [calculateVisibilityOfSidebar]);

    useEffect(() => {
        const getWideAssetsPosition = async () => {
            setTimeout(() => {
                const wideItems = document.querySelectorAll('[class*="wideAsset"]') as NodeListOf<HTMLElement>;
                const arr = Array.from(wideItems).map(item => {
                    const itemHeight = item.getBoundingClientRect().height;
                    return [item.offsetTop, item.offsetTop + itemHeight];
                });

                if (!wideAssetsPositions.length && arr.length) {
                    setWideAssetsPositions(arr);
                }
            }, 0);
        }

        if (sidebar) {
            setSidebarHeight(sidebar.current.getBoundingClientRect().height)
            getWideAssetsPosition();
            scrollAction();
        }
    }, [wideAssetsPositions, setWideAssetsPositions, scrollAction])

    return (
        <div className={styles.sidebar} ref={sidebar}>
            <h2 className={styles.name}>{ author.name }</h2>
            <div className={styles.description}>
                {documentToReactComponents(author.description, {})}
            </div>
            <div onClick={handleGoToCommentsBlock} className={styles.comments}>
                <div className={styles.commentsIcon}>
                    <Image src={commentsIcon} width={24} height={24} alt=""/>
                </div>
                {numberOfComments}
            </div>
            <div className={styles.quickContact}>
                { 
                    author.twitter && (
                        <Link href={author.twitter}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                <Image src={TwitterIcon} width={24} height={19} alt=""/>
                            </a>
                        </Link>
                    )
                }
                { 
                    author.facebook && (
                        <Link href={author.facebook}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                <Image src={FacebookIcon} width={16} height={26} alt="" />
                            </a>
                        </Link>
                    )
                }
                { 
                    author.linkedIn && (
                        <Link href={author.linkedIn}>
                            <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink}>
                                <Image src={LiIcon} width={24} height={24} alt="" />
                            </a>
                        </Link>
                    )
                }
                { 
                    author.email && (
                        <a target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} href={`mailto:${author.email}`}>
                            <Image src={MailIcon} width={24} height={24} alt="" />
                        </a>
                    )
                }
            </div>
        </div>
    )
}

export default PostSidebar;
