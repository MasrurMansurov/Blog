import { create } from 'zustand'

// Type
import { Post } from '../type/Post'
import { User } from '../type/User'
import { Profile } from '../type/Profile'
import { Todo } from '../type/Todos'
import { Comment } from '../type/Comment'


interface IStore {
    posts: Post[],
    users: User[],
    profile: Profile | null ,
    setProfile: (profile: any) => void,
    logOut: () => void,
    getPosts: (posts: Post[]) => void,
    getComments: (comments: Comment[]) => void, 
    addComment: (postId: number, name: string, email: string, body: string) => void,
    getUsers: (users: User[]) => void,
    setMyPosts: (posts: Post[]) => void,
    setMyTodos: (todos: Todo[]) => void
}

const getProfileFromLocalStorage = () => {
    const getProfile = localStorage.getItem('profile')
    if(getProfile) {
        return JSON.parse(getProfile) as Profile
    }
    return null
}

export const useStore = create<IStore>((set) => ({
    posts: [],
    users: [],
    profile: getProfileFromLocalStorage(),
    setProfile: (profile) => set({ profile }),
    logOut: () => set({ profile: null }),


    getPosts: (posts) => {
       set({ posts: posts.map(post => ({ ...post, comments: [] })) })
    },
    getComments: (comments) => {
        set((state) => ({
            posts: state.posts.map(post => 
                post.id === comments[0].postId 
                   ? {...post, comments: [...post.comments,...comments] } 
                   : post
            )
        }))
    },         
    addComment: (postId, name, email, body) => {
        set((state) => {
            const newComment: Comment = {
                postId, 
                id: state.posts.length + 1,
                name,
                email,
                body,
            }
            const updatedData = state.posts.map(post => 
                post.id === postId 
                    ? { ...post, comments: [...post.comments, newComment] } 
                    : post
            )
            return { posts: updatedData }
        })
    },
    getUsers: (users) => {
        set({ users })
    },
    setMyPosts: (posts) => {
        set(( state ) => ({
            profile: {
                ...state.profile as Profile,
                posts
            }
        }))
    },
    setMyTodos: (todos) => {
        set(state => ({
            profile: {
                ...state.profile as Profile,
                todos
            }
        }))
    },
}))
