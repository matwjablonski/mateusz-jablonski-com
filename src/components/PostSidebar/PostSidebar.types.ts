import { MutableRefObject } from "react";
import { Author } from "../../types/common/Author.types";

export interface PostSidebarProps {
    author: Author;
    numberOfComments: number;
    commentsBlockRef: MutableRefObject<HTMLDivElement>;
}