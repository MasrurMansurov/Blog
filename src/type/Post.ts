import { Comment } from "./Comment";

export type Post = {
    userId: number,
    id: number,
    title: string,
    body: string,
    comments: Comment[];
}
