import React from 'react';
import ArticlePreview from "../ArticlePreview"
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import styles from './LastArticles.module.scss';

const LastArticles = ({articles}) => {
    return (
        <div className={styles.lastArticlesWrapper}>
            <div className={styles.lastArticlesSection}>
                <div className={styles.lastArticles} style={{ width: `${384 * articles.length}px` }}>
                    {
                        articles.map(article => <ArticlePreview 
                            key={`article${Math.random()}`}
                            title={article.title}
                            slug={article.slug}
                            excerpt={article.excerpt}
                            createdDate={article.createdDate}
                            featuredImage={article.featuredImage}
                        />)
                    }
                </div>
            </div>
            <div className={styles.btnsLine}>
                <Button.L href="/blog" pattern={ButtonType.CLEAN} label="Wszystkie moje artykuły"/>
                <div className={styles.slidesNav}>
                    <Button.L pattern={ButtonType.SECONDARY} label=""/>
                    <Button.L pattern={ButtonType.SECONDARY} label=""/>
                </div>
            </div>
        </div>
    )
}

export default LastArticles;
