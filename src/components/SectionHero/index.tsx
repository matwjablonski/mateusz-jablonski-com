import Image from 'next/image';
import { ReactElement, ReactNode, useMemo } from 'react';
import Grid from '../Grid';
import styles from './SectionHero.module.scss';
import heroImage from '../../public/books.webp';

interface SectionHeroProps {
    title: ReactElement;
    text: string;
}

const SectionHero = ({ title, text }: SectionHeroProps) => {
    const [ firstElement, ...restElements ] = title.props.children;
    const firstWordAsArray = useMemo(() => firstElement.split('').filter(letter => letter !== ' '), [title]);

    return (
        <section className={styles.sectionHero}>
            <Grid>
                <h2 className={styles.title}>
                    {
                        firstWordAsArray.map((letter, index) => index < firstWordAsArray.length - 1 ? <span key={`${letter}${index}`}>
                                {letter}
                                <em>•</em>
                            </span> : <span key={`${letter}${index}`}>{letter}</span>
                        )
                    }
                    {restElements}
                </h2>
            </Grid>
            <div className={styles.image}>
                <Image src={heroImage} layout="fill" />
            </div>
            <Grid>
                <p className={styles.text}>{text}</p>
            </Grid>
        </section>
    )
}

export default SectionHero;
