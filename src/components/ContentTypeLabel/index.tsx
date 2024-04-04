import cx from 'classnames';
import styles from './ContentTypeLabel.module.scss';

export enum ContentTypeEnum {
    BOOK = 'book',
    ARTICLE = 'article',
    PODCAST = 'podcast',
    WORKSHOPS = 'workshops',
    WEBINAR = 'webinar',
    CONFERENCE = 'conference',
    LECTURE = 'lecture',
}

interface ContentTypeLabelProps {
    contentType: ContentTypeEnum;
    additionalName?: string;
    reverse?: boolean;
}

const ContentTypeLabel = ({ contentType, additionalName, reverse }: ContentTypeLabelProps) => {
    const prepareLabel = () => {
        switch(contentType) {
            case ContentTypeEnum.BOOK:
                return 'Recenzja książki';
            case ContentTypeEnum.ARTICLE:
                return 'Artykuł';
            case ContentTypeEnum.PODCAST:
                return 'Podcast';
            case ContentTypeEnum.WORKSHOPS:
                return 'Warsztaty';
            case ContentTypeEnum.WEBINAR:
                return 'Webinar';
            case ContentTypeEnum.CONFERENCE:
                return 'Konferencja';
            case ContentTypeEnum.LECTURE:
                return 'Wykład';
        }
    }

    return (
        <div className={cx(styles.contentTypeLabel, styles[contentType], reverse && styles.reverse)}>
            {prepareLabel()}{additionalName && `: ${additionalName}`}
        </div>
    )
}

export default ContentTypeLabel;
