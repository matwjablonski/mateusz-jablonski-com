import { Comment } from "../../types/common/Comment.type";

export interface CommentsListProps {
    comments: Comment[];
    postId: string;
    title: string;
}