import Image from 'next/image';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import styles from './RecommendedPodcastTile.module.scss';

interface RecommendedPodcastTileProps {
    name: string;
    source: string;
    image: string;
}

const RecommendedPodcastTile = ({ name, source, image }: RecommendedPodcastTileProps) => (
    <div className={styles.recommendedPodcastTile}>
        <div className={styles.image}>
            <Image src={require(`../../public/images/podcasts/${image}`)} width={352} height={352} />
        </div>
        <h3 className={styles.title}>{name}</h3>
        <Button.L href={source} pattern={ButtonType.CLEAN} label="Posłuchaj" isExternal/>
    </div>
);

export default RecommendedPodcastTile;