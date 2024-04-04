import cx from 'classnames';
import styles from './ContentTypeLabel.module.scss';
import { useTranslations } from '../../hooks/useTranslations';

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
    const { t } = useTranslations();

    const prepareLabel = () => {
        switch(contentType) {
            case ContentTypeEnum.BOOK:
                return t.COMMON.BOOK_REVIEW;
            case ContentTypeEnum.ARTICLE:
                return t.COMMON.ARTICLE;
            case ContentTypeEnum.PODCAST:
                return t.COMMON.PODCAST;
            case ContentTypeEnum.WORKSHOPS:
                return t.COMMON.WORKSHOPS;
            case ContentTypeEnum.WEBINAR:
                return t.COMMON.WEBINAR;
            case ContentTypeEnum.CONFERENCE:
                return t.COMMON.CONFERENCE;
            case ContentTypeEnum.LECTURE:
                return t.COMMON.LECTURE;
        }
    }

    return (
        <div className={cx(styles.contentTypeLabel, styles[contentType], reverse && styles.reverse)}>
            {prepareLabel()}{additionalName && `: ${additionalName}`}
        </div>
    )
}

export default ContentTypeLabel;
