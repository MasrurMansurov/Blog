import axios from 'axios'
import { create } from 'zustand'

// Type
import { Post } from '../post-type/Post'
import { Comment } from '../comment-type/Comment'

// API
import { apiPosts } from '../api-post/Api'
import { apiComments } from '../api-comment/Api'


interface IStore {
    data: Post[],
    getData: () => void,
    comments: Comment[],
    getComments: () => void,
}


export const useStore = create<IStore>((set) => ({  

    data: [],
    getData: async () => {
        try {
            const {data} = await axios.get(apiPosts)
            set({data})
        } catch (error) {
            
        }
    },

    comments: [],
    getComments: async () => {
        try {
            const {data} = await axios.get(apiComments)
            set({comments: data})
        } catch (error) {
            console.error(error)
        }
    }

}))
