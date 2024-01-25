import { FC } from 'react';
import Title from '../Title';
import { PageTitleProps } from './PageTitle.types';
import { Text, Wrapper } from './ui';

const PageTitle: FC<PageTitleProps> = ({ title, description, center, dark }) => {
    return (
        <Wrapper dark={dark} center={center}>
            <Title dark={dark}>{title}</Title>
            <Text dark={dark} center={center}>{description}</Text>
        </Wrapper>
    )
};

export default PageTitle;
