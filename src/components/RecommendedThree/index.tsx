import { ElementType } from 'react';
import { generateRandomNumbers } from '../../lib/random';
import styles from './RecommendedThree.module.scss';

interface RecommendedThreeProps {
    title: string;
    data: { name: string; image?: string; source: string; }[];
    Component: ElementType;
}

const RecommendedThree = ({ title, data, Component }: RecommendedThreeProps) => {
    const indexesToDisplay = generateRandomNumbers(0, data.length, 3);

    return <section className={styles.recommendedThree}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.row}>
            {
                indexesToDisplay
                    .map(index => (
                        <Component {...data[index]} key={data[index].name} />
                    ))
            }
        </div>
    </section>;
};


export default RecommendedThree;