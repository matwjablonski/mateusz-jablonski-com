import React, { FunctionComponent, useEffect } from 'react';
import Image from 'next/image';
import { UserAvatarProps } from './UserAvatar.types';
import md5 from 'md5';

const UserAvatar: FunctionComponent<UserAvatarProps> = ({ email }) => {

    return <div>
        { email ? 
            <Image src={`https://gravatar.com/${md5(email)}`} width={64} height={64} /> :
            <div>adadada</div>
        }
    </div>
}

export default UserAvatar