import { FC } from "react";

interface CurrentReadProps {
    title: string;
    author: string;
    imageUrl: string;
    affiliateLink: string;
}

const CurrentRead: FC<CurrentReadProps> = ({ title, author, imageUrl, affiliateLink }) => {
    return <>
        {title}
        {author}
    </>
}

export default CurrentRead;
