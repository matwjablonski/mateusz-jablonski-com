import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './PostSidebar.module.scss';
import { PostSidebarProps } from './PostSidebar.types';
import commentsIcon from '../../public/icons/comments.svg';

const PostSidebar: FunctionComponent<PostSidebarProps> = ({ author, numberOfComments, commentsBlockRef}) => {
    const sidebar = useRef<HTMLDivElement>(null);
    const [ sidebarHeight, setSidebarHeight ] = useState(0);
    const [ wideAssetsPositions, setWideAssetsPositions ] = useState([]);

    const handleGoToCommentsBlock = () => {
        if (commentsBlockRef.current) {
            commentsBlockRef.current.scrollIntoView({ behavior: 'smooth'})
        }
    }

    const calculateVisibilityOfSidebar = () => {
        const changeYFactor = 100;
        const heightFactor = 50;
        const sidebarPosition = window.scrollY + sidebarHeight + heightFactor;

        if (!wideAssetsPositions.length) {
            return;
        }

        const closest = wideAssetsPositions.reduce((prev, curr) => {
            return (Math.abs(curr[0] - (window.scrollY - changeYFactor)) < Math.abs(prev[0] - (window.scrollY - changeYFactor)) ? curr : prev);
        });

        console.log('closest', closest);

        if (sidebarPosition > closest[0] && window.scrollY < closest[1]) {
            sidebar.current.style.opacity === '1' ? sidebar.current.style.opacity = '0' : null;
        } else {
            sidebar.current.style.opacity === '0' ? sidebar.current.style.opacity = '1' : null;
        }
    }

    const scrollAction = () => {
        if (typeof window !== undefined && sidebar) {
            window.addEventListener('scroll', calculateVisibilityOfSidebar);
        }
    }

    useEffect(() => {
        const getWideAssetsPosition = async () => {
            setTimeout(() => {
                const wideItems = document.querySelectorAll('[class*="wideAsset"]') as NodeListOf<HTMLElement>;
                console.log('wideItems', wideItems);
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

        return typeof window !== undefined && window.removeEventListener('scroll', calculateVisibilityOfSidebar);
    }, [wideAssetsPositions, setWideAssetsPositions])

    return (
        <div className={styles.sidebar} ref={sidebar}>
            <h2 className={styles.name}>{ author.name }</h2>
            <div className={styles.description}>
                {documentToReactComponents(author.description, {})}
            </div>
            <div onClick={handleGoToCommentsBlock} className={styles.comments}>
                <div className={styles.commentsIcon}>
                    <Image src={commentsIcon} width={24} height={24}/>
                </div>
                {numberOfComments}
            </div>
        </div>
    )
}

export default PostSidebar;
