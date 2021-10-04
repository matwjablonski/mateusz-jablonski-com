import React, { FunctionComponent } from 'react';
import { HeroProps } from './Hero.types';
import styles from './Hero.module.scss';
import PageTitle from '../Title';

const Hero: FunctionComponent<HeroProps> = ({ title, description }) => {

    const prepareTitle = () => {
        const titleWithoutClosingStrong = title.replace('</strong>', '');
        const titleArr = titleWithoutClosingStrong.split('<strong>');
    
        return <PageTitle classes={styles.title}>{titleArr[0]}<strong>{titleArr[1]}</strong></PageTitle>
    }

    return (
        <section className={styles.hero}>
            {prepareTitle()}
            <p>{description}</p>
        </section>
    )
};

export default Hero;
