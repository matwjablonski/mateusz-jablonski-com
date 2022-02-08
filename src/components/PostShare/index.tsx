import React, { FunctionComponent } from 'react';
import styles from './PostShare.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton } from 'react-share';
import TwitterIcon from '../../public/icons/twitter-bold.svg';
import FacebookIcon from '../../public/icons/facebook-bold-color.svg';
import LiIcon from '../../public/icons/li-bold-color.svg';
import MailIcon from '../../public/icons/mail.svg';

const PostShare: FunctionComponent = () => {
    const { asPath } = useRouter();
    
    return <div className={styles.shareWrapper}>
        <h3 className={styles.title}>Udostępnij ten artykuł:</h3>
        <TwitterShareButton url={`https://mateuszjablonski.com${asPath}`} className={styles.button}>
            <Image src={TwitterIcon} width={24} height={19} alt=""/>
        </TwitterShareButton>
        <FacebookShareButton url={`https://mateuszjablonski.com${asPath}`} className={styles.button}>
            <Image src={FacebookIcon} width={16} height={26} alt=""/>
        </FacebookShareButton>
        <LinkedinShareButton url={`https://mateuszjablonski.com${asPath}`} className={styles.button}>
            <Image src={LiIcon} width={24} height={24} alt=""/>
        </LinkedinShareButton>
        <EmailShareButton url={`https://mateuszjablonski.com${asPath}`} className={styles.button}>
            <Image src={MailIcon} width={24} height={24} alt=""/>
        </EmailShareButton>
    </div>
}

export default PostShare;
