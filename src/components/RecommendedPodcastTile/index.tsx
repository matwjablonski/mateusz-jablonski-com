import Image from 'next/image';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';

interface RecommendedPodcastTileProps {
    name: string;
    source: string;
    image: string;
}

const RecommendedPodcastTile = ({ name, source, image }: RecommendedPodcastTileProps) => (
    <div>
        <Image src={`/images/podcasts/${image}`} width={352} height={352} />
        <h3>{name}</h3>
        {image}
        <Button.L href={source} pattern={ButtonType.CLEAN} label="Posłuchaj" isExternal/>
    </div>
);

export default RecommendedPodcastTile;