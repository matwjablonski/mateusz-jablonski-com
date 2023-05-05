import { Article } from "../../types/common/Article.types"
import { Book } from "../../types/common/Book.types"
import { Podcast, PodcastEpisode } from "../../types/common/Podcast.types"
import ArticlePreview from "../ArticlePreview";
import { Preview } from "../ArticlePreview/ArticlePreview.types";
import BookBigPreview from "../BookBigPreview";
import PodcastPreview from '../PodcastPreview';
import styles from './LastContent.module.scss';

export type ContentType = ((Article | Book | PodcastEpisode) & {type: string}); 

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
                            const articleItem = item as Article;
                            return (
                                <ArticlePreview
                                    key={`article${articleItem.title}`}
                                    title={articleItem.title}
                                    slug={articleItem.slug}
                                    excerpt={articleItem.excerpt}
                                    createdDate={articleItem.createdDate}
                                    featuredImage={articleItem.featuredImage}
                                    preview={Preview.VERTICAL}
                                    externalSource={articleItem.externalSource}
                                    showContentType
                                />
                            )
                        }

                        if (item.type === 'book') {
                            const bookItem = item as Book;
                            return (
                                <BookBigPreview
                                    key={`book-${bookItem.title}`}
                                    title={bookItem.title}
                                    slug={bookItem.slug}
                                    author={bookItem.author}
                                    excerpt={bookItem.excerpt}
                                    image={bookItem.cover}
                                    createdDate={bookItem.createdDate}
                                    showContentType
                                />
                            );
                        }

                        if (item.type === 'podcast') {
                            const podcastItem = item as PodcastEpisode;
                            return (
                                <PodcastPreview
                                    key={`book-${podcastItem.title}`}
                                    title={podcastItem.title}
                                    slug={podcastItem.slug}
                                    author={podcastItem.author[0].fields?.name as unknown as string || ''}
                                    excerpt={item.excerpt}
                                    image={podcastItem.featuredImage}
                                    createdDate={podcastItem.createdDate}
                                    podcastName={podcastItem.podcast.name}
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
