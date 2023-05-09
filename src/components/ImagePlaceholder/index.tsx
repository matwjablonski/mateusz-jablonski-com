import React, { FC } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import image from '../../public/icons/image-solid.svg'
import styles from './ImagePlaceholder.module.scss';

type ImagePlaceholder = {
    width: number;
    height: number;
    withoutShadow?: boolean;
}

const ImagePlaceholder: FC<ImagePlaceholder> = ({ width, height, withoutShadow }) => (
    <div className={cx(styles.imagePlaceholder, withoutShadow && styles.noShadow)} style={{ width, height }}>
        <Image src={image || `/icons/image-solid.svg`} width={144} height={108} alt=""/>
    </div>
)

export default ImagePlaceholder;
