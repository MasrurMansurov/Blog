import {User} from "./User"
import { Post } from "./Post"
import { Todo } from "./Todos"

export type Profile = User & {
    todos: Todo[],
    posts: Post[]
}