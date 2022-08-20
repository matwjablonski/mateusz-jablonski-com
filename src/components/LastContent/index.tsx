import { Article } from "../../types/common/Article.types"
import { Book } from "../../types/common/Book.types"
import { Podcast } from "../../types/common/Podcast.types"
import ArticlePreview from "../ArticlePreview";
import { Preview } from "../ArticlePreview/ArticlePreview.types";
import BookBigPreview from "../BookBigPreview";
import styles from './LastContent.module.scss';

export type ContentType = ((Article | Book | Podcast) & {type: string}); 

interface LastContentProps {
    content: ContentType[];
}

const LastContent = ({ content }: LastContentProps) => {
    return (
        <div className={styles.lastContent}>
            <h2 className={styles.title}>Ostatnie materiały</h2>
            <p className={styles.text}>Poniżej znajdziesz najnowsze przygotowane przeze mnie materiały. Zapraszam do zapoznania się z nimi. Mam nadzieję, że wyciągniesz z nich dużo wartości dla siebie.</p>
            <div className={styles.dataRow}>
                {
                    content.map(item => {
                        if (item.type === 'article') {
                            return (
                                <ArticlePreview
                                    key={`article${Math.random()}`}
                                    title={item.title}
                                    slug={item.slug}
                                    excerpt={item.excerpt}
                                    createdDate={item.createdDate}
                                    featuredImage={(item as Article).featuredImage}
                                    preview={Preview.VERTICAL}
                                    externalSource={(item as Article).externalSource}
                                    showContentType
                                />
                            )
                        }

                        if (item.type === 'book') {
                            return (
                                <BookBigPreview
                                    title={item.title}
                                    slug={item.slug}
                                    author={(item as Book).author}
                                    excerpt={item.excerpt}
                                    image={(item as Book).cover}
                                    createdDate={item.createdDate}
                                    showContentType
                                />
                            );
                        }

                    })
                }
            </div>
        </div>
    );
}

export default LastContent;
