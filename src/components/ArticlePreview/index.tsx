import React, { FunctionComponent } from 'react';
import { ArticlePreviewProps } from './ArticlePreview.types';

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = ({title, createdDate}) => {
    return (
        <div>
            {createdDate}
            {title}
        </div>
    )
}

export default ArticlePreview;
