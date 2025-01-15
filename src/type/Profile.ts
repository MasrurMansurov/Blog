import {User} from "./User"
import { Todos } from "./Todos"
import { Post } from "./Post"

export type Profile = User & {
    todos: Todos[],
    posts: Post[]
}