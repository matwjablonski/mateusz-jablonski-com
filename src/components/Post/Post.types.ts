import { MutableRefObject } from 'react';
import { Article } from '../../types/common/Article.types';

export interface PostProps {
    post: Article,
    numberOfComments: number;
    commentsBlockRef: MutableRefObject<HTMLDivElement>;
}