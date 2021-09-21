import React from 'react';
import ArticlePreview from "../ArticlePreview"
import styles from './LastArticles.module.scss';

const LastArticles = ({articles}) => {
    return (
        <div className={styles.lastArticles}>
            {
                articles.map(article => <ArticlePreview 
                    key={`article${Math.random()}`}
                    title={article.title}
                    slug={article.slug}
                    excerpt={article.excerpt}
                    createdDate={article.createdDate}
                />)
            }
        </div>
    )
}

export default LastArticles;
