import Image from 'next/image';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import ImagePlaceholder from '../ImagePlaceholder';
import styles from './RecommendedVlogTile.module.scss';

interface RecommendedVlogTileProps {
    name: string;
    source: string;
    image?: string;
}

const RecommendedVlogTile = ({ name, source, image }: RecommendedVlogTileProps) => (
    <div className={styles.recommendedVlogTile}>
        <div className={styles.image}>
            { image 
                ? image.includes('http')
                    ? <Image src={image} width={352} height={198} />
                    : <Image src={require(`../../public/images/podcasts/${image}`)} width={352} height={198} />
                : <ImagePlaceholder width="352px" height="198px" />
            }
        </div>
        <h3 className={styles.title}>{name}</h3>
        <Button.L href={source} pattern={ButtonType.CLEAN} label="Zajrzyj na Youtube" isExternal/>
    </div>
);

export default RecommendedVlogTile;