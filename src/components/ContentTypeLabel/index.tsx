import cx from 'classnames';
import styles from './ContentTypeLabel.module.scss';

export enum ContentTypeEnum {
    BOOK = 'book',
    ARTICLE = 'article',
    PODCAST = 'podcast',
}

interface ContentTypeLabelProps {
    contentType: ContentTypeEnum;
    additionalName?: string;
}

const ContentTypeLabel = ({ contentType, additionalName }: ContentTypeLabelProps) => {
    const prepareLabel = () => {
        switch(contentType) {
            case ContentTypeEnum.BOOK:
                return 'Recenzja książki';
            case ContentTypeEnum.ARTICLE:
                return 'Artykuł';
            case ContentTypeEnum.PODCAST:
                return 'Podcast';
        }
    }

    return (
        <div className={cx(styles.contentTypeLabel, styles[contentType])}>
            {prepareLabel()}{additionalName && `: ${additionalName}`}
        </div>
    )
}

export default ContentTypeLabel;
