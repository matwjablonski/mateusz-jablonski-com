import React, { FC, useState } from 'react';
import cx from 'classnames';
import ArticlePreview from "../ArticlePreview"
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import styles from './LastArticles.module.scss';
import { Article } from '../../types/common/Article.types';
import { Preview } from '../ArticlePreview/ArticlePreview.types';
import { useTranslations } from '../../hooks/useTranslations';

const ITEM_WIDTH = 384;
const ITEMS_ON_SCREEN = 3;

const LastArticles: FC<{ articles: Article[] }> = ({articles}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useTranslations();

    const handleOnNext = () => {
        setCurrentIndex((prev) => prev + 1)
    }

    const handleOnPrev = () => {
        setCurrentIndex((prev) => prev - 1);
    }

    const checkIsIndexVisible = (index) => {
        const visibleIndexes = Array.from({length: 3}, (_, i) => i + currentIndex);
        
        return visibleIndexes.includes(index);
    }

    return (
        <div className={styles.lastArticlesWrapper}>
            <div className={styles.lastArticlesSection}>
                <div className={styles.lastArticles} style={{ width: `${ITEM_WIDTH * (articles.length + 1)}px`, left: `${currentIndex * ITEM_WIDTH * -1}px` }}>
                    {
                        articles.map((article, index) => <ArticlePreview 
                            key={`article${Math.random()}`}
                            title={article.title}
                            slug={article.slug}
                            excerpt={article.excerpt}
                            createdDate={article.createdDate}
                            featuredImage={article.featuredImage}
                            className={cx(!checkIsIndexVisible(index) && styles.inactivePreview)}
                            preview={Preview.VERTICAL}
                            externalSource={article.externalSource}
                        />)
                    }
                    <div className={cx(styles.lastBox, !checkIsIndexVisible(articles.length) && styles.inactivePreview)}>
                        <span className={styles.lastIco}>✍</span>
                        <h3 className={styles.lastTitle}>{t.HOME.LAST_ARTICLES_END.TITLE}</h3>
                        <p className={styles.lastMsg}>{t.HOME.LAST_ARTICLES_END.MESSAGE}</p>
                        <Button.L pattern={ButtonType.PRIMARY} label={t.HOME.LAST_ARTICLES_END.ACTION} href="/blog"/>
                    </div>
                </div>
            </div>
            <div className={styles.btnsLine}>
                <Button.L href="/blog" pattern={ButtonType.CLEAN} label={t.HOME.ALL_ARTICLES}/>
                <div className={styles.sliderBtns}>
                    <Button.L 
                        pattern={ButtonType.SECONDARY}
                        className={cx(styles.previous, currentIndex === 0 && styles.inactive)}
                        onClick={handleOnPrev}
                    />
                    <Button.L
                        pattern={ButtonType.SECONDARY}
                        className={cx(currentIndex === (articles.length + 1) - ITEMS_ON_SCREEN && styles.inactive)}
                        onClick={handleOnNext}
                    />
                </div>
            </div>
        </div>
    )
}

export default LastArticles;
