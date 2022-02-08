import React from 'react';
import Image from 'next/image';
import image from '../../public/icons/image-solid.svg'
import styles from './ImagePlaceholder.module.scss';

const ImagePlaceholder = ({ width, height }) => <div className={styles.imagePlaceholder} style={{ width, height }}>
    <Image src={image || `/icons/image-solid.svg`} width={144} height={108} alt=""/>
</div>

export default ImagePlaceholder;
