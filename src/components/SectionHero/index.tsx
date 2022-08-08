import Image from 'next/image';
import { ReactElement, ReactNode, useMemo } from 'react';
import Grid from '../Grid';
import styles from './SectionHero.module.scss';

interface SectionHeroProps {
    title: ReactElement;
}


const SectionHero = ({ title }: SectionHeroProps) => {
    const [ firstElement, ...restElements ] = title.props.children;
    const firstWordAsArray = useMemo(() => firstElement.split('').filter(letter => letter !== ' '), [title]);

    return (
        <section className={styles.sectionHero}>
            <Grid>
                <h2 className={styles.title}>
                    {
                        firstWordAsArray.map((letter, index) => index < firstWordAsArray.length - 1 ? <>
                                {letter}
                                <em>•</em>
                            </> : <>{letter}</>
                        )
                    }
                    {restElements}
                </h2>
            </Grid>
            <div className={styles.image}>
                <Image src="/public/books.webp" layout="fill" />
            </div>
        </section>
    )
}

export default SectionHero;
