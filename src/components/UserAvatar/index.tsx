import React, { FunctionComponent, useEffect } from 'react';
import Image from 'next/image';
import { UserAvatarProps } from './UserAvatar.types';
import md5 from 'md5';
import styles from './UserAvatar.module.scss';

const UserAvatar: FunctionComponent<UserAvatarProps> = ({ email }) => (
    <div className={styles.userAvatar}>
        { email ? 
            <Image src={`https://gravatar.com/avatar/${md5(email)}`} width={64} height={64} className={styles.avatar} alt="" /> :
            <div className={styles.avatarPlaceholder} />
        }
    </div>
)

export default UserAvatar